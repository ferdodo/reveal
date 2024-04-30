import { Puzzle, PuzzleFactory, SavingPuzzleState, SvelteContext, Context, createPuzzleStorageMock, createConsentStorageMock } from "core";
import { Subject } from "rxjs";
import { uid } from "uid";

export class ContextFactory {
	contextId: string = uid();
	context: Context;

	constructor() {
		this.context = {
			puzzleStorage: createPuzzleStorageMock(),
			consentStorage: createConsentStorageMock()
		};
	}

	addPuzzle(): ContextFactory {
		const puzzle = new PuzzleFactory().build();
		this.context.puzzleStorage.save(puzzle);
		return this;
	}

	build(): SvelteContext {
		const svelteContext: SvelteContext = new Map();
		return svelteContext.set(this.contextId, this.context);
	}

	getContextId(): string {
		return this.contextId;
	}

	getContext(): Context {
		return this.context;
	}
}
