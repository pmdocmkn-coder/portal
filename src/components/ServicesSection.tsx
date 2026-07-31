import React from 'react';
import { COMPANY_SOLUTIONS } from '../data/portalData';
import { FadeIn } from './ui/FadeIn';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="solutions" className="bg-white text-[#1A202C] px-6 md:px-12 py-24 border-b border-[#E2E8F0] relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn y={20} delay={0} duration={0.6}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D94F2B] bg-[#D94F2B]/10 px-3.5 py-1.5 rounded-full border border-[#D94F2B]/20">
                Klasifikasi Portal MKN
              </span>
            </FadeIn>
            <FadeIn y={30} delay={0.1} duration={0.7}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B3A6B] uppercase tracking-tight mt-3">
                Kategori Portal & Ekosistem Sistem
              </h2>
            </FadeIn>
          </div>
          <FadeIn y={20} delay={0.2} duration={0.6}>
            <p className="text-sm text-[#718096] max-w-md">
              Struktur kategorisasi web portal terorganisir untuk mempermudah identifikasi fungsi, hak akses, dan tingkat prioritas operasional.
            </p>
          </FadeIn>
        </div>

        {/* List of Solutions */}
        <div className="divide-y divide-[#E2E8F0]">
          {COMPANY_SOLUTIONS.map((service, index) => (
            <FadeIn
              key={service.number}
              y={20}
              delay={index * 0.1}
              duration={0.6}
            >
              <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-[#F7F8FA] px-4 rounded-2xl transition-colors">
                <div className="flex items-start md:items-center gap-6">
                  <span className="text-3xl md:text-4xl font-black text-[#2B6CB0] opacity-80 group-hover:text-[#D94F2B] transition-colors min-w-[60px]">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#1B3A6B] group-hover:text-[#2B6CB0] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#718096] max-w-2xl mt-1.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-1 bg-[#059669]/10 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Enterprise Ready
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Banner */}
        <FadeIn y={30} delay={0.4} duration={0.6}>
          <div className="mt-16 bg-[#1B3A6B] text-white p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold text-[#E86547] uppercase tracking-wider block mb-1">
                Akses Portal & Bantuan Teknis Internal
              </span>
              <h4 className="text-xl md:text-2xl font-black">
                Butuh Akses Baru atau Bantuan Kendala Portal Perusahaan?
              </h4>
            </div>
            <button
              onClick={onOpenContact}
              className="bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer text-sm"
            >
              Ajukan Permintaan Akses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
