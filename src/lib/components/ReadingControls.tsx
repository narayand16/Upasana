import type { FC } from 'react';
import { useState, useEffect } from 'react';

export interface ReadingControlsProps {
  currentFontSize?: number;
  isScreenRotated?: boolean;
}

const ReadingControls: FC<ReadingControlsProps> = ({
  currentFontSize: initialFontSize = 20,
  isScreenRotated: initialScreenRotated = false,
}) => {
  const fontSizes: number[] = [16, 20, 24, 28, 32, 36];
  const [currentFontSize, setCurrentFontSize] = useState<number>(initialFontSize);
  const [isScreenRotated, setIsScreenRotated] = useState<boolean>(initialScreenRotated);
  
  const currentIndex: number = fontSizes.indexOf(currentFontSize);

  const handleIncreaseFontSize = (): void => {
    if (currentIndex < fontSizes.length - 1) {
      const newSize = fontSizes[currentIndex + 1];
      setCurrentFontSize(newSize);
      
      // Apply the font size change
      const content = document.getElementById('reading-content');
      if (content) {
        content.style.fontSize = `${newSize}px`;
      }
    }
  };

  const handleDecreaseFontSize = (): void => {
    if (currentIndex > 0) {
      const newSize = fontSizes[currentIndex - 1];
      setCurrentFontSize(newSize);
      
      // Apply the font size change
      const content = document.getElementById('reading-content');
      if (content) {
        content.style.fontSize = `${newSize}px`;
      }
    }
  };

  const handleRotateScreen = (): void => {
    const newRotatedState = !isScreenRotated;
    setIsScreenRotated(newRotatedState);
    
    // Apply the rotation to the entire page content
    const body = document.body;
    if (newRotatedState) {
      // Switch to landscape mode
      body.classList.add('landscape-mode');
    } else {
      // Switch back to portrait mode
      body.classList.remove('landscape-mode');
    }
  };

  // Apply initial font size on mount
  useEffect(() => {
    const content = document.getElementById('reading-content');
    if (content) {
      content.style.fontSize = `${initialFontSize}px`;
    }
  }, [initialFontSize]); // Include initialFontSize as dependency

  return (
    <div className="reading-controls fixed bottom-4 right-4 flex flex-col gap-2 z-10">
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg flex flex-col items-center p-2">
        <button
          type="button"
          onClick={handleIncreaseFontSize}
          disabled={currentIndex >= fontSizes.length - 1}
          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 p-2"
          aria-label="Increase font size"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Increase font size</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 my-1">
          {currentFontSize}px
        </div>
        
        <button
          type="button"
          onClick={handleDecreaseFontSize}
          disabled={currentIndex <= 0}
          className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 p-2"
          aria-label="Decrease font size"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Decrease font size</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
      
      <button
        type="button"
        onClick={handleRotateScreen}
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label={isScreenRotated ? "Switch to portrait mode" : "Switch to landscape mode"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>Rotate screen</title>
          {isScreenRotated ? (
            // Portrait mode icon (phone upright)
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 14h10M9 7h6" 
            />
          ) : (
            // Landscape mode icon (phone sideways)
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 7h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm14 0V5a2 2 0 00-2-2H7M7 9v6" 
            />
          )}
        </svg>
      </button>
    </div>
  );
};

export default ReadingControls;
