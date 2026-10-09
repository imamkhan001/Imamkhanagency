import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Project } from '../../types';
import { LivePreview } from './LivePreview';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formattedNumber = String(index + 1).padStart(2, '0');

  const bullet1 = project.bullet_1 || project.features?.[0] || 'Custom Responsive Web Design';
  const bullet2 = project.bullet_2 || project.features?.[1] || 'Optimized Lead Conversion Flow';
  const bullet3 = project.bullet_3 || project.result_metric || project.features?.[2] || 'Fast Loading & Mobile Friendly';

  const isLive = project.status === 'live';
  const isShowcase = project.status === 'showcase';

  const formattedCategory = project.category === 'fitness'
    ? (project.categories?.includes('wordpress') ? 'Fitness Website — WordPress' : 'Fitness Website')
    : project.category === 'healthcare'
    ? (project.categories?.includes('wordpress') ? 'Healthcare Website — WordPress' : 'Healthcare Web Application')
    : project.category === 'automotive'
    ? 'Automotive Website'
    : project.category === 'wordpress'
    ? 'WordPress Website'
    : `${project.category.charAt(0).toUpperCase() + project.category.slice(1)} Website`;

  return (
    <div className="relative rounded-2xl bg-[#0d0d12] border border-white/10 p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-300 group hover:-translate-y-1 hover:border-[#00ff88]/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.18)] overflow-hidden">
      
      {/* 36px Number Badge */}
      <div className="w-8 h-8 rounded-full bg-[#00ff88] text-black font-extrabold text-xs flex items-center justify-center absolute -top-3 -left-3 z-30 shadow-[0_0_12px_rgba(0,255,136,0.4)]">
        {formattedNumber}
      </div>

      <div className="w-full">
        {/* Reusable LivePreview Component with Desktop & Overlapping Phone Mockups */}
        <LivePreview project={project} />

        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[#00ff88] text-xs font-bold tracking-wide uppercase">
            {formattedCategory}
          </span>
          {isLive ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full border border-[#00ff88]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              Live
            </span>
          ) : isShowcase ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00d2ff] bg-[#00d2ff]/10 px-2 py-0.5 rounded-full border border-[#00d2ff]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
              Showcase
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Concept
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3
          className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-[#00ff88] transition-colors"
          style={{ fontFamily: "'IBM Plex Serif', serif" }}
        >
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#9e9eb0] mb-3 leading-relaxed font-normal line-clamp-2" style={{ fontFamily: "'PT Serif', serif" }}>
          {project.description}
        </p>

        {/* Key Features / Checklist */}
        <ul className="space-y-1 text-xs text-[#d1d1db] mb-3 font-normal">
          <li className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className="truncate">{bullet1}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className="truncate">{bullet2}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className={`truncate ${project.result_metric || project.bullet_3 ? 'text-white font-semibold' : ''}`}>{bullet3}</span>
          </li>
        </ul>

        {/* Technology Pills */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#15151c] text-[#a7b0bd] border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Full-width Green "View Live Website →" Button */}
      <div className="pt-1">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] active:bg-[#00cc66] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.01]"
        >
          <span>View Live Website</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
export default ProjectCard;
