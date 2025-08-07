import type { FC } from 'react';

export interface SectionCardProps {
  id: string;
  bookId: string;
  title: string;
  titleDevanagari: string;
  number: number;
  description?: string;
}

const SectionCard: FC<SectionCardProps> = ({
  id,
  bookId,
  title,
  titleDevanagari,
  number,
  description,
}) => {
  return (
    <a 
      href={`/books/${bookId}/${id}`}
      className="block transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md"
    >
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center mr-4">
          <span className="font-semibold">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <h4 className="text-md font-devanagari text-primary-600 dark:text-primary-400">{titleDevanagari}</h4>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <title>Chevron right</title>
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default SectionCard;
