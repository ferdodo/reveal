import { Puzzle, SavingPuzzleState, PuzzleStorage, ConsentStorage } from "core";
import { Observable } from "rxjs";

export interface Context {
	puzzleStorage: PuzzleStorage;
	consentStorage: ConsentStorage;
}

export interface SvelteContext extends Map<string, Context> {
}
