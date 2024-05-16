import { uid } from "uid";

import {
	PuzzleFactory,
	SvelteContext,
	Context,
	createPuzzleStorageMock,
	createConsentStorageMock,
	createDateStorageMock
} from "core";

export class ContextFactory {
	contextId: string = uid();
	context: Context;

	constructor() {
		this.context = {
			puzzleStorage: createPuzzleStorageMock(),
			consentStorage: createConsentStorageMock(),
			dateStorage: createDateStorageMock()
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
