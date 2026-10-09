import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.categories.includes(filter);
  });

  return (
    <section id="projects" className="py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Featured Projects"
          title="Custom Web Design"
          highlightText="Portfolio"
          description="Custom websites designed and developed for local businesses, dental clinics, gyms, and service providers in Bangalore and beyond."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'healthcare', label: 'Healthcare' },
            { id: 'fitness', label: 'Fitness' },
            { id: 'wordpress', label: 'WordPress' },
            { id: 'automotive', label: 'Automotive' }
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                    : 'bg-[#111116] border border-[#1a1a24] text-[#9e9eb0] hover:text-white hover:border-[#00ff88]/30'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: 3x2 on desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="flex justify-center pt-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.3)] hover:scale-105 transition-all duration-200"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
