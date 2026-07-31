import React from 'react';
import { FEATURED_PROJECTS } from '../data/portalData';
import { ProjectCard } from './ProjectCard';
import { FadeIn } from './ui/FadeIn';

interface ProjectsSectionProps {
  onOpenContact?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  return (
    <section
      id="projects"
      className="bg-[#F7F8FA] border-b border-[#E2E8F0] relative z-20 px-6 md:px-12 pt-20 pb-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn y={20} delay={0} duration={0.6}>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D94F2B] bg-[#D94F2B]/10 px-3.5 py-1.5 rounded-full border border-[#D94F2B]/20">
              Sorotan Portal Utama
            </span>
          </FadeIn>
          <FadeIn y={30} delay={0.1} duration={0.7}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B3A6B] uppercase tracking-tight mt-3">
              Portal Unggulan MKN
            </h2>
          </FadeIn>
          <FadeIn y={20} delay={0.2} duration={0.6}>
            <p className="text-sm text-[#718096] mt-3">
              Pratinjau langsung 3 portal utama yang paling sering diakses oleh tim eksekutif dan operasional perusahaan.
            </p>
          </FadeIn>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={FEATURED_PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
