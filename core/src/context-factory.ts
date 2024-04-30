import { Puzzle, SavingPuzzleState, SvelteContext, Context, createPuzzleStorageMock, createConsentStorageMock } from "core";
import { Subject } from "rxjs";
import { uid } from "uid";

export class ContextFactory {
	contextId: string = uid();
	savingPuzzle$: Subject<SavingPuzzleState> = new Subject();
	context: Context;

	constructor() {
		this.context = {
			puzzleStorage: createPuzzleStorageMock(),
			consentStorage: createConsentStorageMock()
		};
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
