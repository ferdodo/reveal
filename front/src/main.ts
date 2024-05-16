import "cookies-ds";
import { App, SvelteContext, Context, defaultContextId, createDateStorage } from "core";
import { createPuzzleStorage } from "./create-puzzle-storage";
import { createConsentStorage } from "./create-consent-storage";

let _context: Context = {
	puzzleStorage: createPuzzleStorage(),
	consentStorage: createConsentStorage(),
	dateStorage: createDateStorage()
};

let context: SvelteContext = new Map()
	.set(defaultContextId, _context);


new App({ target: document.body, context });
