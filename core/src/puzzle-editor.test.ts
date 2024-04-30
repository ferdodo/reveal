import { test, expect } from "vitest";
import { PuzzleEditor, ContextFactory, createdPuzzle$, savingPuzzle$ } from "core";
import { render, screen, within, fireEvent } from "@testing-library/svelte";
import { uid } from "uid";
import { firstValueFrom, timeout } from "rxjs";

test("writing in the image url input should initialize a puzzle", function() {
	const contextFactory = new ContextFactory();
	const context = contextFactory.build();
	const contextId = contextFactory.getContextId();
	const dataTestid = uid();
	let puzzle = null;
	const subscription = createdPuzzle$.subscribe(value => puzzle = value);
	render(PuzzleEditor, { context, props: { contextId, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByLabelText("image-url-input");
	fireEvent.input(input, { target: { value: "new url" } });
	expect(puzzle.imageURL).toEqual("new url");
	subscription.unsubscribe();
});

test("should save puzzle when clicking save button", async function() {
	const contextFactory = new ContextFactory();
	const svelteContext = contextFactory.build();
	const contextId = contextFactory.getContextId();
	const context = contextFactory.getContext();
	const dataTestid = uid();
	let puzzle = null;
	const subscription = createdPuzzle$.subscribe(value => puzzle = value);
	const savedPuzzle$ = context.puzzleStorage.watch();
	render(PuzzleEditor, { context: svelteContext, props: { contextId, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByLabelText("image-url-input");
	fireEvent.input(input, { target: { value: "new url" } });
	expect(puzzle).toBeTruthy();
	const button = within(component).getByLabelText("puzzle-save-button");

	const waitSavedPuzzle = firstValueFrom(
		savedPuzzle$.pipe(
			timeout(50)
		)
	);
	
	fireEvent.click(button);
	const savedPuzzle = await waitSavedPuzzle;
	expect(savedPuzzle).toBeTruthy();
	subscription.unsubscribe();
});
