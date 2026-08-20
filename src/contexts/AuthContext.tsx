import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { 
  PageKey, RolePermissions, ADMIN_FULL_ACCESS, DEFAULT_EDITOR_PERMISSIONS, checkPermission, PermissionAction 
} from '../config/permissions';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  userRole: string | null;
  permissions: RolePermissions | null;
  loading: boolean;
  canAccessPage: (page: string) => boolean;
  hasPermission: (page: string, action: PermissionAction) => boolean;
  refreshPermissions: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  userRole: null,
  permissions: null,
  loading: true,
  canAccessPage: () => false,
  hasPermission: () => false,
  refreshPermissions: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<RolePermissions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
        setUserRole(null);
        setPermissions(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching role:', error);
        setIsAdmin(false);
        setUserRole(null);
        setPermissions(null);
      } else {
        const role = data?.role;
        setUserRole(role);
        setIsAdmin(role === 'admin' || role === 'editor');
        
        if (role === 'admin') {
          // Admin always gets full access
          setPermissions(ADMIN_FULL_ACCESS);
        } else if (role === 'editor') {
          // Fetch editor permissions from DB
          await fetchEditorPermissions(role);
        } else {
          setPermissions(null);
        }
      }
    } catch (err) {
      console.error('Unexpected error checking admin status:', err);
      setIsAdmin(false);
      setUserRole(null);
      setPermissions(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditorPermissions = async (role: string) => {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('page, can_view, can_create, can_update, can_delete')
        .eq('role', role);

      if (error || !data || data.length === 0) {
        // Fallback to defaults if DB permissions not found
        console.warn('Using default editor permissions');
        setPermissions(DEFAULT_EDITOR_PERMISSIONS);
        return;
      }

      // Build permissions object from DB rows
      const perms: Partial<RolePermissions> = {};
      for (const row of data) {
        perms[row.page as PageKey] = {
          can_view: row.can_view,
          can_create: row.can_create,
          can_update: row.can_update,
          can_delete: row.can_delete,
        };
      }
      
      // Merge with defaults (in case new pages are added but not yet in DB)
      setPermissions({ ...DEFAULT_EDITOR_PERMISSIONS, ...perms } as RolePermissions);
    } catch (err) {
      console.error('Error fetching permissions:', err);
      setPermissions(DEFAULT_EDITOR_PERMISSIONS);
    }
  };

  const canAccessPage = useCallback((page: string): boolean => {
    if (userRole === 'admin') return true;
    if (!permissions) return false;
    return checkPermission(permissions, page as PageKey, 'view');
  }, [userRole, permissions]);

  const hasPermission = useCallback((page: string, action: PermissionAction): boolean => {
    if (userRole === 'admin') return true;
    if (!permissions) return false;
    return checkPermission(permissions, page as PageKey, action);
  }, [userRole, permissions]);

  const refreshPermissions = useCallback(async () => {
    if (userRole === 'editor') {
      await fetchEditorPermissions(userRole);
    }
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ 
      session, user, isAdmin, userRole, permissions, loading,
      canAccessPage, hasPermission, refreshPermissions
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
