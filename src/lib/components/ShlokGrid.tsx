import { ShlokCard } from './ShlokCard';

export interface Shlok {
  number: number;
  lines: string[];
}

interface ShlokGridProps {
shloks: Shlok[];
  favourites: Set<number>;
  onToggleFavourite: (n: number) => void;
}

export const ShlokGrid = ({ shloks, favourites, onToggleFavourite }: ShlokGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh]">
      {shloks.map(shlok => (
        <div key={shlok.number} data-shlok={shlok.number}>
          <ShlokCard
            number={shlok.number}
            lines={shlok.lines}
            isFavourite={favourites.has(shlok.number)}
            onToggleFavourite={() => onToggleFavourite(shlok.number)}
          />
        </div>
      ))}
    </div>
  );
};