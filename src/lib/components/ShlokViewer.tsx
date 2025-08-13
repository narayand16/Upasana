import { useState } from 'react';
import { ShlokGrid } from './ShlokGrid';
import shlokData from '../../content/books/shri-manache-shlok.json';

const ShlokViewer = () => {
  const [favourites, setFavourites] = useState<Set<number>>(new Set());
  const handleToggleFavourite = (n: number) => {
    setFavourites(favs => {
      const next = new Set(favs);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };
  return (
    <ShlokGrid
      shloks={shlokData.shloks}
      favourites={favourites}
      onToggleFavourite={handleToggleFavourite}
    />
  );
};

export default ShlokViewer;