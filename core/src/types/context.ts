import { Puzzle, SavingPuzzleState, PuzzleStorage, ConsentStorage, DateStorage } from "core";
import { Observable } from "rxjs";

export interface Context {
	puzzleStorage: PuzzleStorage;
	consentStorage: ConsentStorage;
	dateStorage: DateStorage;
}

export interface SvelteContext extends Map<string, Context> {
}
