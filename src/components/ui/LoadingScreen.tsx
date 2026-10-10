import React from 'react';

interface LoadingScreenProps {
  className?: string;
  isOverlay?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  className = '',
  isOverlay = false
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Imam Khan Web Design"
      className={`${
        isOverlay
          ? 'fixed inset-0 z-[9999]'
          : 'w-full min-h-[60vh] flex-1'
      } bg-[#050505] flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-out select-none ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient background glow ring */}
        <div
          className="absolute w-28 h-28 rounded-full pointer-events-none animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.2) 0%, rgba(0,255,136,0.05) 50%, transparent 70%)',
            filter: 'blur(16px)',
          }}
          aria-hidden="true"
        />

        {/* Existing Official IK Logo Asset with smooth premium green glow */}
        <div className="relative z-10 transition-transform duration-500 ease-in-out hover:scale-105">
          <img
            src="/images/ik-logo.svg"
            alt="IK Logo"
            width={64}
            height={64}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.65)) drop-shadow(0 0 40px rgba(0,255,136,0.3))',
            }}
          />
        </div>
      </div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
};

export default LoadingScreen;
