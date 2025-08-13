export interface ShlokCardProps {
  number: number;
  lines: string[];
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

export const ShlokCard: React.FC<ShlokCardProps> = ({ number, lines, isFavourite, onToggleFavourite }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col gap-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-lg">{number}</span>
      <button
        type="button"
        aria-label={isFavourite ? 'Unfavourite' : 'Favourite'}
        onClick={onToggleFavourite}
        className="text-yellow-500 text-xl"
      >
        {isFavourite ? '★' : '☆'}
      </button>
    </div>
    <div className="font-devanagari text-base space-y-1">
      {lines.map((line, i) => <div key={i}>{line}</div>)}
    </div>
  </div>
);