export const ShowFavouritesToggle: React.FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ value, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <span className="text-sm font-medium">Show Favourites</span>
    <span className="relative inline-block w-10 h-6">
      <input
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
        className="peer opacity-0 w-10 h-6"
      />
      <span
        className="absolute left-0 top-0 h-6 w-10 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors peer-checked:bg-primary-600"
      />
      <span
        className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white dark:bg-gray-200 shadow transition-transform peer-checked:translate-x-4"
      />
    </span>
  </label>
);