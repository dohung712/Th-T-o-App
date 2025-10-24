
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-4 px-8 bg-slate-900/50 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10 sticky top-0 z-20 backdrop-blur-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-cyan-400" style={{ textShadow: '0 0 8px #06b6d4' }}>
        Gemini Future-Tech Image Editor
      </h1>
    </header>
  );
};
