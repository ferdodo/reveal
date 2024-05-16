import { test, expect } from "vitest";
import { Consent, ContextFactory } from "core";
import { render, screen, within, fireEvent } from "@testing-library/svelte";
import { uid } from "uid";
import { firstValueFrom, timeout } from "rxjs";

test("clicking on consent button should set consent to true", async function() {
	const contextFactory = new ContextFactory()
		.addPuzzle();

	const svelteContext = contextFactory.build();
	const context = contextFactory.getContext();
	const contextId = contextFactory.getContextId();
	const dataTestid = uid();
	render(Consent, { context: svelteContext, props: { contextId, dataTestid } });
	const component = await screen.findByTestId(dataTestid);
	const consentBeforeClick = context.consentStorage.read();
	expect(consentBeforeClick).toBeFalsy();
	const button = within(component).getByLabelText("consent-button");
	fireEvent.click(button);
	const consent = context.consentStorage.read();
	expect(consent).toBeTruthy();
});
