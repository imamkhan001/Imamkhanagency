import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Project } from '../../types';
import { LivePreview } from './LivePreview';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const bullet1 = project.bullet_1 || project.features?.[0] || 'Custom Responsive Web Design';
  const bullet2 = project.bullet_2 || project.features?.[1] || 'Optimized Lead Conversion Flow';
  const bullet3 = project.bullet_3 || project.result_metric || project.features?.[2] || 'Fast Loading & Mobile Friendly';

  const isLive = project.status === 'live';
  const isShowcase = project.status === 'showcase';

  // Shorten labels, e.g. "HEALTHCARE · WORDPRESS", "FITNESS · WORDPRESS", "FITNESS", "AUTOMOTIVE"
  const formattedCategory = project.category === 'fitness'
    ? (project.categories?.includes('wordpress') ? 'FITNESS · WORDPRESS' : 'FITNESS')
    : project.category === 'healthcare'
    ? (project.categories?.includes('wordpress') ? 'HEALTHCARE · WORDPRESS' : 'HEALTHCARE')
    : project.category === 'automotive'
    ? 'AUTOMOTIVE'
    : project.category === 'wordpress'
    ? 'WORDPRESS'
    : project.category.toUpperCase();

  // Max 4 chips plus "+N" chip
  const maxTags = 4;
  const visibleTags = (project.tags || []).slice(0, maxTags);
  const remainingCount = (project.tags || []).length - maxTags;

  return (
    <div className="relative rounded-2xl bg-[#0d0d12] border border-white/10 p-4 sm:p-5 flex flex-col justify-between h-full transition-all duration-300 group hover:-translate-y-1 hover:border-[#00ff88]/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.18)] overflow-hidden">
      <div className="flex flex-col flex-1">
        {/* Reusable LivePreview Component with Desktop & Overlapping Phone Mockups */}
        <LivePreview project={project} />

        {/* Category & Status: single line, text-overflow ellipsis, status badge on same row */}
        <div className="flex items-center justify-between gap-2 mb-2 min-h-[22px]">
          <span className="text-[#00ff88] text-[11px] sm:text-xs font-bold tracking-wider uppercase truncate min-w-0">
            {formattedCategory}
          </span>
          <div className="shrink-0">
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
        </div>

        {/* Project Title: 1 line (ellipsis) */}
        <h3
          className="text-base sm:text-lg font-bold text-white mb-2 truncate group-hover:text-[#00ff88] transition-colors leading-tight"
          style={{ fontFamily: "'IBM Plex Serif', serif" }}
          title={project.title}
        >
          {project.title}
        </h3>

        {/* Short Description: exactly 3 lines (line-clamp-3) with fixed height */}
        <p
          className="text-xs text-[#9e9eb0] mb-3 leading-relaxed font-normal line-clamp-3 min-h-[4.5em]"
          style={{ fontFamily: "'PT Serif', serif" }}
        >
          {project.description}
        </p>

        {/* Exactly 3 feature bullets, each max 2 lines, same min-height so tag row starts at same y */}
        <ul className="space-y-1.5 text-xs text-[#d1d1db] mb-3 font-normal min-h-[6.5rem] flex flex-col justify-start">
          <li className="flex items-start gap-1.5 leading-snug">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{bullet1}</span>
          </li>
          <li className="flex items-start gap-1.5 leading-snug">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{bullet2}</span>
          </li>
          <li className="flex items-start gap-1.5 leading-snug">
            <Check className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{bullet3}</span>
          </li>
        </ul>

        {/* Tags: maximum 4 chips plus "+N" chip, one row (flex-wrap hidden / overflow-hidden), fixed height */}
        <div className="h-6 flex items-center gap-1.5 overflow-hidden flex-nowrap mb-4">
          {visibleTags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#15151c] text-[#a7b0bd] border border-white/5 truncate shrink-0 max-w-[90px]"
            >
              {tag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#15151c] text-[#00ff88] border border-[#00ff88]/20 shrink-0">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* "View Live Website" button pinned to the bottom (margin-top auto), same position in every card */}
      <div className="mt-auto pt-1 w-full">
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
