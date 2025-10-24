
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageDisplay } from './components/ImageDisplay';
import { ActionPanel } from './components/ActionPanel';
import { INITIAL_IMAGE_DATA_URL, INITIAL_PROMPT } from './constants';
import { fileToBase64 } from './utils/fileUtils';
import { editImageWithPrompt } from './services/geminiService';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(INITIAL_IMAGE_DATA_URL);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(INITIAL_PROMPT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("File is too large. Please select an image under 4MB.");
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        setOriginalImage(base64);
        setEditedImage(null);
        setError(null);
      } catch (err) {
        setError("Failed to load image. Please try again.");
      }
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithPrompt(originalImage, prompt);
      setEditedImage(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-48 md:mb-32">
          <ImageDisplay title="Original Image" imageUrl={originalImage} />
          <ImageDisplay title="Edited Image" imageUrl={editedImage} isLoading={isLoading} />
        </div>
      </main>
      <ActionPanel
        prompt={prompt}
        onPromptChange={setPrompt}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
