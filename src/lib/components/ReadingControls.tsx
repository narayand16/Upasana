export interface ReadingControlsProps {
  onFontSizeChange: (fontSize: number) => void;
  onRotateScreen: () => void;
  currentFontSize: number;
  isScreenRotated: boolean;
}

const ReadingControls = ({
  onFontSizeChange,
  onRotateScreen,
  currentFontSize,
  isScreenRotated,
}: ReadingControlsProps) => {
  const fontSizes: number[] = [16, 18, 20, 22, 24, 26, 28];
  const currentIndex: number = fontSizes.indexOf(currentFontSize);

  const handleIncreaseFontSize = (): void => {
    if (currentIndex < fontSizes.length - 1) {
      onFontSizeChange(fontSizes[currentIndex + 1]);
    }
  };

  const handleDecreaseFontSize = (): void => {
    if (currentIndex > 0) {
      onFontSizeChange(fontSizes[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-10">
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
        onClick={onRotateScreen}
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label={isScreenRotated ? "Portrait orientation" : "Landscape orientation"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 transition-transform ${isScreenRotated ? 'rotate-90' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>Rotate screen</title>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" 
          />
        </svg>
      </button>
    </div>
  );
};

export default ReadingControls;
