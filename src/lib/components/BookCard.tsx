import type { FC } from 'react';

export interface BookCardProps {
  id: string;
  title: string;
  titleDevanagari: string;
  description: string;
  author?: string;
  coverImage?: string;
}

const BookCard: FC<BookCardProps> = ({
  id,
  title,
  titleDevanagari,
  description,
  author,
  coverImage,
}) => {
  return (
    <a 
      href={`/books/${id}`}
      className="block transition-all duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1"
    >
      <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-4xl font-devanagari font-bold text-white">
            {titleDevanagari.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
        <h4 className="text-lg font-devanagari text-primary-600 dark:text-primary-400 mb-2">{titleDevanagari}</h4>
        {author && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">by {author}</p>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{description}</p>
      </div>
    </a>
  );
};

export default BookCard;
