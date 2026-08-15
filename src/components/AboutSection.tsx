import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { AnimatedText } from './ui/AnimatedText';
import { Building2, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const companyDescription = "MKN Portal Hub adalah direktori portal perusahaan terpadu yang dirancang untuk memudahkan navigasi, akses sistem operasional, pemantauan analitik, dan pengelolaan ekosistem digital perusahaan dalam satu lokasi terpusat.";

  return (
    <section id="overview" className="relative py-24 sm:py-32 bg-[#F7F8FA] border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn y={20} delay={0} duration={0.6}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D94F2B] bg-[#D94F2B]/10 px-3.5 py-1.5 rounded-full border border-[#D94F2B]/20">
              Profil Portal Perusahaan
            </span>
          </FadeIn>

          <FadeIn y={30} delay={0.1} duration={0.7}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B3A6B] uppercase tracking-tight mt-4">
              Tentang MKN Portal Hub
            </h2>
          </FadeIn>

          <div className="mt-6">
            <AnimatedText
              text={companyDescription}
              className="text-[#718096] font-normal text-center leading-relaxed text-base sm:text-lg max-w-2xl mx-auto"
            />
          </div>
        </div>

        {/* 3 Pillar Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn y={30} delay={0.2} duration={0.6}>
            <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-5 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A202C] mb-2">Akses Terpusat 1-Pintu</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Seluruh aplikasi operasional, dashboard internal, dan platform layanan diakses langsung tanpa hambatan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#1B3A6B]">
                <span>1-Click Launch</span>
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              </div>
            </div>
          </FadeIn>

          <FadeIn y={30} delay={0.3} duration={0.6}>
            <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2B6CB0] text-white flex items-center justify-center mb-5 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A202C] mb-2">Pencarian & Filter Cepat</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Sistem klasifikasi kategori portal dan pencarian kata kunci instan untuk navigasi efisien.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#2B6CB0]">
                <span>Navigasi Cerdas</span>
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              </div>
            </div>
          </FadeIn>

          <FadeIn y={30} delay={0.4} duration={0.6}>
            <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#D94F2B] text-white flex items-center justify-center mb-5 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A202C] mb-2">Keamanan & Keandalan</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Integrasi protokol keamanan Single Sign-On (SSO), pemantauan server, dan perlindungan data terenkripsi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#D94F2B]">
                <span>SSO Enforced</span>
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
