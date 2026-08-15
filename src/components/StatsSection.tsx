import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 bg-[#2B3F56] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/hero_tower_bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">37+</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Listings</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">10+</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Listing Categories</p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-light mb-2">65k+</h3>
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-200">Visitors</p>
          </div>
        </div>
      </div>
    </section>
  );
};
