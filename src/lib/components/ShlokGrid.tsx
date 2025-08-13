import type React from 'react';
import { useRef } from 'react';
import { ShlokCard } from './ShlokCard';
import { JumpToShlok } from './JumpToShlok';

export interface Shlok {
  number: number;
  lines: string[];
}

export const ShlokGrid: React.FC<{
  shloks: Shlok[];
  favourites: Set<number>;
  onToggleFavourite: (n: number) => void;
}> = ({ shloks, favourites, onToggleFavourite }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleJump = (n: number) => {
    const el = gridRef.current?.querySelector(`[data-shlok='${n}']`);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <JumpToShlok onJump={handleJump} max={shloks.length} />
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh]">
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
    </div>
  );
};