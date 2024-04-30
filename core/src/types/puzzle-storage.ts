import { Puzzle } from "core";
import { Observable } from "rxjs";

export interface PuzzleStorage {
	save: (puzzle: Puzzle) => Promise<void>;
	read: () => Promise<Puzzle>;
	watch: () => Observable<Puzzle>;
	check: (puzzle: Puzzle) => Promise<void>;
	readImageDataURL: (puzzle: Puzzle) => Promise<string>;
	watchImageDataURL: () => Observable<string>;
	getImageSize: (dataURL: string) => Promise<[number, number]>;}
