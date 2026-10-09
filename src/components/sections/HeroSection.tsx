import React from 'react';
import { ArrowRight, Globe, Layers, Code, Terminal, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { StatCounter } from '../ui/StatCounter';
import { siteConfig } from '../../data/siteConfig';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        paddingTop: 'clamp(90px, 10vw, 120px)',
        paddingBottom: 'clamp(60px, 7vw, 90px)',
        background: 'radial-gradient(circle at 80% 30%, rgba(0,255,136,0.04) 0%, transparent 50%)',
      }}
    >
      {/* Background Ambience Layer (.hero-bg-elements) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
        {/* Glow 1 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            top: '10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(114,9,183,0.08), rgba(0,180,216,0.05) 50%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Glow 2 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            bottom: '-10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(0,255,136,0.06), rgba(0,180,216,0.04) 50%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Dot Grid 1 */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            width: 140,
            height: 140,
            top: '25%',
            left: '6%',
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            transform: 'rotate(-8deg)',
            animation: 'floatAnimation 14s infinite alternate ease-in-out',
          }}
        />

        {/* Dot Grid 2 */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            width: 160,
            height: 160,
            bottom: '15%',
            right: '42%',
            backgroundImage: 'radial-gradient(rgba(0,255,136,0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            transform: 'rotate(12deg)',
            animation: 'floatAnimation 18s infinite alternate ease-in-out -4s',
          }}
        />

        {/* Floating Ring 1 */}
        <div
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            width: 70,
            height: 70,
            top: '18%',
            right: '35%',
            border: '1.5px solid rgba(114,9,183,0.2)',
            animation: 'floatAnimation 12s infinite alternate ease-in-out',
          }}
        />

        {/* Floating Ring 2 */}
        <div
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            width: 50,
            height: 50,
            bottom: '25%',
            left: '38%',
            border: '1.5px dashed rgba(0,255,136,0.25)',
            animation: 'floatAnimation 10s infinite alternate ease-in-out -2s',
          }}
        />

        {/* Floating Ring 3 */}
        <div
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            width: 35,
            height: 35,
            top: '48%',
            left: '4%',
            border: '1.5px solid rgba(0,180,216,0.25)',
            animation: 'floatAnimation 11s infinite alternate ease-in-out -3s',
          }}
        />

        {/* SVG Wave Curves */}
        <svg
          className="absolute top-1/3 left-0 w-full h-auto opacity-10 pointer-events-none"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192"
            stroke="url(#waveGrad1)"
            strokeWidth="2"
          />
          <path
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,128C960,107,1056,117,1152,144C1248,171,1344,213,1392,234.7L1440,256"
            stroke="url(#waveGrad2)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7209b7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16 items-center">
          
          {/* Main Hero Content Column (.hero-content) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116] border border-[#1a1a24] text-xs font-semibold text-[#00ff88] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span>WEBSITES BUILT FOR BUSINESS GROWTH</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6"
              style={{ fontFamily: "'IBM Plex Serif', serif" }}
            >
              Websites That Turn Visitors Into{' '}
              <span className="text-[#00ff88]">Customers</span>
            </h1>

            {/* Paragraph Subtitle */}
            <p
              className="text-base sm:text-lg text-[#9e9eb0] leading-relaxed max-w-2xl mb-8 font-normal"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              A website should do more than look professional. I am a freelance web designer in Bangalore creating fast, modern, and mobile-friendly websites for local service businesses, dental clinics, gyms, and growing companies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(0,255,136,0.3)] hover:scale-105"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111116] hover:bg-[#1a1a24] border border-[#1a1a24] hover:border-[#00ff88]/40 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4 text-[#00ff88]" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-lg">
              <StatCounter target={10} label="Websites Built" suffix="+" />
              <StatCounter target={3} prefix="<" label="Secondload" suffix="" />
              <StatCounter target={100} label="Client Satisfaction" suffix="%" />
            </div>

          </div>

          {/* Hero Image & Tech Badges Column (.hero-image-container) */}
          <div className="relative flex justify-center items-center animate-fade-in-right">
            
            {/* Pulsing Glow Backdrop */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 540,
                height: 540,
                top: '50%',
                left: '50%',
                background: 'radial-gradient(circle, rgba(0,180,216,0.35) 0%, rgba(114,9,183,0.25) 35%, rgba(0,255,136,0.12) 55%, transparent 75%)',
                filter: 'blur(35px)',
                zIndex: 0,
                animation: 'pulseGlow 8s infinite alternate ease-in-out',
              }}
            />

            {/* Photo Wrapper (.hero-image-wrapper) */}
            <div className="relative w-[300px] h-[300px] xs:w-[320px] xs:h-[320px] sm:w-[400px] sm:h-[400px] z-10" style={{ aspectRatio: '1 / 1' }}>
              
              {/* Responsive Photo */}
              <picture className="w-full h-full block">
                <source
                  type="image/webp"
                  srcSet="/images/imam-khan-professional-400w.webp 400w, /images/imam-khan-professional-800w.webp 800w"
                  sizes="(max-width: 768px) 320px, 400px"
                />
                <img
                  src="/images/imam-khan-professional.jpg"
                  alt="Imam Khan — Web Designer & WordPress Expert"
                  width={400}
                  height={400}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03] hover:rotate-1"
                  style={{
                    borderRadius: '24px',
                    border: '2px solid #00ff88',
                    boxShadow: '0 0 30px rgba(0,255,136,0.2)',
                    aspectRatio: '1 / 1',
                  }}
                />
              </picture>

              {/* Floating Tech Badges */}
              {/* Badge 1: WordPress */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 z-20 top-2 left-2 sm:top-[8%] sm:left-[-18%]"
                style={{
                  background: 'rgba(10,10,12,0.85)',
                  border: '1.5px solid rgba(0,180,216,0.4)',
                  boxShadow: '0 0 15px rgba(0,180,216,0.2)',
                  animation: 'floatAnimation 11s infinite alternate ease-in-out',
                }}
              >
                <svg className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px] shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.5c5.799 0 10.5 4.701 10.5 10.5 0 2.215-.705 4.269-1.902 5.952L14.28 6.467c-.604-1.637-1.155-3.134-1.745-4.689.479-.187.989-.281 1.503-.278zM1.5 12c0-3.327 1.402-6.326 3.65-8.472l4.137 11.353L4.996 17.595C2.868 15.684 1.5 13.978 1.5 12zm10.5 10.5c-1.391 0-2.709-.323-3.896-.897l3.864-11.233 3.864 11.233c-1.187.574-2.505.897-3.896.897zm5.952-3.152l-3.921-11.398c1.782-1.258 3.97-2.025 6.368-2.025 1.517 0 2.946.353 4.212.983-1.642 3.284-3.486 7.42-6.659 12.44z"/>
                </svg>
                <span className="text-[11px] sm:text-xs font-semibold text-white">WordPress</span>
              </div>

              {/* Badge 2: CSS3 */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 z-20 top-2 right-2 sm:top-[15%] sm:right-[-18%]"
                style={{
                  background: 'rgba(10,10,12,0.85)',
                  border: '1.5px solid rgba(168,85,247,0.4)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.2)',
                  animation: 'floatAnimation 10s infinite alternate ease-in-out -1s',
                }}
              >
                <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                <span className="text-[11px] sm:text-xs font-semibold text-white">CSS3</span>
              </div>

              {/* Badge 3: HTML5 */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 z-20 top-[45%] left-1 sm:top-[42%] sm:left-[-22%]"
                style={{
                  background: 'rgba(10,10,12,0.85)',
                  border: '1.5px solid rgba(0,255,136,0.4)',
                  boxShadow: '0 0 15px rgba(0,255,136,0.2)',
                  animation: 'floatAnimation 13s infinite alternate ease-in-out -3s',
                }}
              >
                <Code className="w-3.5 h-3.5 text-[#00ff88]" />
                <span className="text-[11px] sm:text-xs font-semibold text-white">HTML5</span>
              </div>

              {/* Badge 4: JavaScript */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 z-20 top-[60%] right-1 sm:top-[58%] sm:right-[-20%]"
                style={{
                  background: 'rgba(10,10,12,0.85)',
                  border: '1.5px solid rgba(0,255,136,0.4)',
                  boxShadow: '0 0 15px rgba(0,255,136,0.2)',
                  animation: 'floatAnimation 12s infinite alternate ease-in-out -5s',
                }}
              >
                <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
                <span className="text-[11px] sm:text-xs font-semibold text-white">JavaScript</span>
              </div>

              {/* Badge 5: AI Automation */}
              <div
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 z-20 bottom-2 left-2 sm:bottom-[-12%] sm:left-[8%]"
                style={{
                  background: 'rgba(10,10,12,0.85)',
                  border: '1.5px solid rgba(0,255,136,0.4)',
                  boxShadow: '0 0 20px rgba(0,255,136,0.25)',
                  animation: 'floatAnimation 12s infinite alternate ease-in-out -2s',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#00ff88]">AI Automation</span>
              </div>

              {/* Status Badge: Available for Work ✓ */}
              <div
                className="absolute flex items-center gap-1.5 px-3 py-1.5 font-bold text-black shadow-lg"
                style={{
                  bottom: '-12px',
                  right: '-12px',
                  backgroundColor: '#00ff88',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  boxShadow: '0 0 20px rgba(0,255,136,0.5)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span>Available for Work ✓</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
