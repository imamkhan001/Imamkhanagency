import React from 'react';
import { Marquee } from '../ui/Marquee';

export const ServicesMarqueeSection: React.FC = () => {
  const items = [
    'GOOGLE BUSINESS PROFILE',
    'LOCAL SEO',
    'HIGH CONVERTING LANDING PAGES',
    'WORDPRESS DEVELOPMENT',
    'WHATSAPP LEAD INTEGRATION',
    'SUB-3S SPEED OPTIMIZATION',
    'MOBILE FIRST UI/UX',
    'E-COMMERCE STORES',
    'CLINIC & GYM PORTALS'
  ];

  return (
    <div className="w-full bg-[#09090d] border-y border-white/5 py-4">
      <Marquee items={items} />
    </div>
  );
};
