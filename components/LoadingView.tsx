import React from 'react';

export const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
      <div className="relative">
        {/* Decorative Mandala-like spin */}
        <div className="absolute inset-0 border-4 border-orange-100 rounded-full animate-[spin_3s_linear_infinite] w-32 h-32"></div>
        <div className="absolute inset-2 border-4 border-t-orange-500 border-r-transparent border-b-rose-500 border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite] w-28 h-28"></div>
        <div className="w-32 h-32 flex items-center justify-center">
            <span className="text-4xl">🕉️</span>
        </div>
      </div>
      <h3 className="mt-8 text-xl font-medium text-slate-700">Aligning Celestial Bodies...</h3>
      <p className="text-slate-500 mt-2 text-sm text-center max-w-xs">
        Calculating Nakshatra, Moon Sign, and Numerology charts based on your inputs.
      </p>
    </div>
  );
};