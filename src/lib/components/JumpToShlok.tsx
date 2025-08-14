import type React from "react";
import { useState } from "react";

export const JumpToShlok: React.FC<{
	onJump: (n: number) => void;
	max: number;
}> = ({ onJump, max }) => {
	const [value, setValue] = useState("");
	return (
		<form
			className="flex gap-2 mb-0"
			onSubmit={(e) => {
				e.preventDefault();
				const n = Number.parseInt(value, 10);
				if (n >= 1 && n <= max) onJump(n);
			}}
		>
			<input
				type="number"
				min={1}
				max={max}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Jump to shlok"
				className="border rounded px-2 py-1 w-64"
			/>
			<button
				type="submit"
				className="bg-primary-600 text-white px-3 py-1 rounded"
			>
				Go
			</button>
		</form>
	);
};
