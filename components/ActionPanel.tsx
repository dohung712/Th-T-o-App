
import React from 'react';

interface ActionPanelProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);

const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);

export const ActionPanel: React.FC<ActionPanelProps> = ({ prompt, onPromptChange, onFileChange, onSubmit, isLoading }) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md p-4 border-t border-slate-700 shadow-2xl shadow-black/50 z-30">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
                <div className="flex-grow w-full">
                    <textarea
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        placeholder="Describe the edits you want to make..."
                        className="w-full h-16 md:h-full bg-slate-900 border-2 border-slate-600 rounded-lg p-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all resize-none"
                        disabled={isLoading}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <label htmlFor="file-upload" className="cursor-pointer flex-1 md:flex-initial text-center bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                       <UploadIcon />
                       <span>Upload</span>
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={onFileChange} accept="image/png, image/jpeg, image/webp" />
                    
                    <button
                        onClick={onSubmit}
                        disabled={isLoading || !prompt}
                        className="flex-1 md:flex-initial flex items-center justify-center font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out bg-cyan-500 text-slate-900 enabled:hover:bg-cyan-400 enabled:hover:shadow-lg enabled:hover:shadow-cyan-500/50 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                           <>
                            <GenerateIcon />
                            <span>Generate</span>
                           </>
                        )}
                    </button>
                </div>
            </div>
        </footer>
    );
};
