import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectCardData } from '../types';
import { ExternalLink, Layers, ShieldCheck } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
  totalCards: number;
  onOpenPreview?: (project: ProjectCardData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenPreview
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-24 md:top-32 h-[85vh] sm:h-[80vh] flex items-center justify-center mb-12 sm:mb-20"
      style={{
        top: `calc(6rem + ${index * 28}px)`
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full bg-white border-2 border-[#1B3A6B] rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative"
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2rem, 5vw, 70px)' }}
              className="font-black text-[#1B3A6B] leading-none select-none"
            >
              {project.number}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#1B3A6B] px-3 py-1 rounded-full inline-block mb-1">
                {project.type}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A202C] tracking-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (onOpenPreview) {
                  e.preventDefault();
                  onOpenPreview(project);
                }
              }}
              className="bg-[#D94F2B] hover:bg-[#E86547] text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Buka Live Portal
            </a>
          </div>
        </div>

        {/* Project Description & Tech Stack */}
        <div className="mb-4 bg-[#F7F8FA] p-3.5 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#718096]">
          <p className="line-clamp-2 max-w-3xl leading-relaxed text-[#1A202C]">
            {project.description}
          </p>
          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 flex-shrink-0">
              {project.techStack.map((tech) => (
                <span key={tech} className="bg-white border border-[#E2E8F0] text-[#1B3A6B] font-bold px-2 py-0.5 rounded text-[10px]">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0">
          <div className="md:col-span-5 flex flex-col gap-4 h-full justify-between">
            <div className="w-full h-1/2 rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E2E8F0] shadow-sm">
              <img
                src={project.col1Image1}
                alt={`${project.title} Showcase 1`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full h-1/2 rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E2E8F0] shadow-sm">
              <img
                src={project.col1Image2}
                alt={`${project.title} Showcase 2`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="md:col-span-7 h-full rounded-2xl overflow-hidden bg-[#F7F8FA] border border-[#E2E8F0] shadow-sm">
            <img
              src={project.col2Image}
              alt={`${project.title} Main Showcase`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
