import { useState, useRef, useEffect } from "react";
import { ShlokGrid } from "./ShlokGrid";
import { JumpToShlok } from "./JumpToShlok";
import { ShowFavouritesToggle } from "./ShowFavouritesToggle";
import shlokData from "../../content/books/shri-manache-shlok.json";
import { getFromStorage, setInStorage } from "../utils/storage";

const FAV_KEY = "manache-shlok-favourites";
const ShlokViewer = () => {
	const [favourites, setFavourites] = useState<Set<number>>(() => {
		const arr = getFromStorage<number[]>(FAV_KEY);
		return arr ? new Set(arr) : new Set();
	});
	const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setInStorage(FAV_KEY, Array.from(favourites));
	}, [favourites]);

	const handleToggleFavourite = (n: number) => {
		setFavourites((favs) => {
			const next = new Set(favs);
			next.has(n) ? next.delete(n) : next.add(n);
			return next;
		});
	};

	const handleJump = (n: number) => {
		const el = gridRef.current?.querySelector(`[data-shlok='${n}']`);
		if (el)
			(el as HTMLElement).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
	};

	const filteredShloks = showFavouritesOnly
		? shlokData.shloks.filter((shlok) => favourites.has(shlok.number))
		: shlokData.shloks;

	return (
		<div>
			<div className="flex items-center gap-4 mb-4">
				<JumpToShlok onJump={handleJump} max={shlokData.shloks.length} />
				<ShowFavouritesToggle
					value={showFavouritesOnly}
					onChange={setShowFavouritesOnly}
				/>
			</div>
			<div ref={gridRef}>
				<ShlokGrid
					shloks={filteredShloks}
					favourites={favourites}
					onToggleFavourite={handleToggleFavourite}
				/>
			</div>
		</div>
	);
};

export default ShlokViewer;
