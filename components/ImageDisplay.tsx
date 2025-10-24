
import React from 'react';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const Placeholder: React.FC = () => (
  <div className="w-full h-full bg-slate-800/50 rounded-lg flex items-center justify-center">
    <div className="text-center text-slate-500">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        <p className="mt-2 text-sm">Edited image will appear here</p>
    </div>
  </div>
);

const Spinner: React.FC = () => (
  <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center rounded-lg z-10">
    <svg className="animate-spin h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-cyan-300">Generating with Gemini...</p>
  </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-center text-fuchsia-400" style={{ textShadow: '0 0 5px #d946ef' }}>{title}</h2>
      <div className="aspect-[3/4] w-full bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700 relative shadow-lg shadow-black/50">
        {isLoading && <Spinner />}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          !isLoading && <Placeholder />
        )}
      </div>
    </div>
  );
};
