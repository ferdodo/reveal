import { Observable, Subject } from "rxjs";
import { Puzzle, Context, SavingPuzzleState } from "core";

let savingPuzzle: SavingPuzzleState = SavingPuzzleState.Idle;
const _savingPuzzle$: Subject<SavingPuzzleState> = new Subject();

export const savingPuzzle$: Observable<SavingPuzzleState> = _savingPuzzle$.asObservable();

export function getSavingPuzzle(): SavingPuzzleState {
	return savingPuzzle;
}

export async function saveEditedPuzzle(context: Context, puzzle: Puzzle | undefined) {
	if (!puzzle) {
		return;
	}

	if (savingPuzzle === SavingPuzzleState.Pending) {
		throw new Error("Puzzle is already saving !");
	}

	savingPuzzle = SavingPuzzleState.Pending;
	_savingPuzzle$.next(SavingPuzzleState.Pending);

	try {
		await context.puzzleStorage.save(puzzle);
		savingPuzzle = SavingPuzzleState.Idle;
		_savingPuzzle$.next(SavingPuzzleState.Idle);
	} catch(error) {
		console.error(error);
		savingPuzzle = SavingPuzzleState.UnknownError;
		_savingPuzzle$.next(SavingPuzzleState.UnknownError);
	}
}
