import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Building2, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Enterprise Web Portal Architecture',
    budget: '$10k - $25k',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#1A202C]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F8FA] hover:bg-[#E2E8F0] text-[#1B3A6B] transition-colors cursor-pointer border border-[#E2E8F0]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#059669] animate-bounce" />
            <h3 className="text-2xl font-black text-[#1B3A6B]">Pesan Terkirim ke Tim MKN!</h3>
            <p className="text-xs text-[#718096] max-w-sm leading-relaxed">
              Terima kasih telah menghubungi MKN Digital Portal. Tim eksekutif kami akan meninjau kebutuhan proyek Anda dan menghubungi Anda kembali dalam waktu 24 jam.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D94F2B]" />
              <span className="text-xs uppercase tracking-widest text-[#1B3A6B] font-extrabold">
                Konsultasi Portal Perusahaan
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1B3A6B] uppercase tracking-tight mb-6">
              Diskusi Proyek MKN Portal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] placeholder-[#718096] focus:outline-none focus:border-[#2B6CB0] transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Nusanet Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] placeholder-[#718096] focus:outline-none focus:border-[#2B6CB0] transition-colors font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                  Email Perusahaan
                </label>
                <input
                  type="email"
                  required
                  placeholder="budi@nusanet.co.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] placeholder-[#718096] focus:outline-none focus:border-[#2B6CB0] transition-colors font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                    Layanan Solusi
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] focus:outline-none focus:border-[#2B6CB0] transition-colors font-medium"
                  >
                    <option value="Enterprise Web Portal Architecture">Enterprise Web Portal Architecture</option>
                    <option value="3D WebGL & Motion Design">3D WebGL & Motion Design</option>
                    <option value="Corporate Brand Identity Systems">Corporate Brand Identity Systems</option>
                    <option value="Interactive Client Dashboard">Interactive Client Dashboard</option>
                    <option value="Cloud Integration & Ecosystem">Cloud Integration & Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                    Estimasi Anggaran
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] focus:outline-none focus:border-[#2B6CB0] transition-colors font-medium"
                  >
                    <option value="<$10k">&lt; $10,000</option>
                    <option value="$10k - $25k">$10,000 - $25,000</option>
                    <option value="$25k - $50k">$25,000 - $50,000</option>
                    <option value="$50k+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#1B3A6B] mb-1.5 font-bold">
                  Rincian Kebutuhan Portal
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan kebutuhan portal web perusahaan Anda, sasaran fitur, atau tautan acuan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-[#1A202C] placeholder-[#718096] focus:outline-none focus:border-[#2B6CB0] transition-colors resize-none font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  Kirim Permintaan Konsultasi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
