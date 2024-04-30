<script lang="ts">
	import { onDestroy, getContext } from 'svelte';

	import {
		Context,
		Puzzle,
		defaultContextId,
		createdPuzzle$,
		getCurrentSlots,
		Slot,
		puzzleSizeX,
		puzzleSizeY
	} from "core";

	export let dataTestid = undefined;
	export let contextId = defaultContextId;

	const context = getContext(contextId) as Context;
	let puzzleDataURL: string | null = null;
	let puzzle: Puzzle | null = null;
	let slots: Slot[] | null = null;
	let imageSize = [1, 1];
	let panelElement;
	let consent = context.consentStorage.read();

	const sub = context.puzzleStorage.watchImageDataURL()
		.subscribe(async function(value) {
			panelElement?.setAttribute("loading", "50");
			imageSize = await context.puzzleStorage.getImageSize(value);
			puzzleDataURL = value;
			panelElement?.setAttribute("loading", "100");
		});

	const sub2 = context.puzzleStorage.watch()
		.subscribe(function(p) {
			puzzle = p;
			slots = getCurrentSlots(p);
		});

	const sub3 = context.consentStorage.watch()
		.subscribe(function(value) {
			consent = value;

			context.puzzleStorage.readImageDataURL(puzzle)
				.then(async function(value) {
					if (value) {
						panelElement?.setAttribute("loading", "50");
						imageSize = await context.puzzleStorage.getImageSize(value);
						puzzleDataURL = value;
						panelElement?.setAttribute("loading", "100");
					}
				})
				.catch(console.error);
		});

	context.puzzleStorage.read()
		.then(function(p) {
			puzzle = p;
			slots = p && getCurrentSlots(p);

			if (!puzzle) {
				return;
			}

			panelElement?.setAttribute("loading", "25");
			return context.puzzleStorage.readImageDataURL(puzzle);
		})
		.then(async function(value) {
			if (value) {
				panelElement?.setAttribute("loading", "50");
				imageSize = await context.puzzleStorage.getImageSize(value);
				puzzleDataURL = value;
				panelElement?.setAttribute("loading", "100");
			}
		})
		.catch(console.error);

	onDestroy(() => sub.unsubscribe());
	onDestroy(() => sub2.unsubscribe());
	onDestroy(() => sub3.unsubscribe());
</script>

{#if puzzle && consent}
	<cookies-panel bind:this={panelElement} loading="0" panel-title="Reveal" data-testid={dataTestid}>

		{#if puzzleDataURL}
			<cookies-p>
				Chaque jour, une nouvelle partie de l'image mystérieuse
				sera dévoilée. Soyez le premier à deviner ce qu'elle représente.
			</cookies-p>
		
			<div
				class="image-container"
				style:background-image={`url("${ puzzleDataURL }")`}
				style:grid-template-columns={`repeat(puzzleSizeX, 1fr)`}
				style:grid-template-rows={`repeat(puzzleSizeY, 1fr)`}
				style:aspect-ratio={`${ imageSize[0] }/${ imageSize[1] }`}
			>
				{#each slots as { gridX, gridY, hidden }}
					{#if hidden}
						<div
							class="hidden-zone"
							style:grid-area={`${gridX}/${gridY}/${gridX+1}/${gridY+1}`}
						>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<cookies-p> Puzzle en cours de chargement.. </cookies-p>
		{/if}
	</cookies-panel>
{/if}

<style>
	.image-container {
		max-height: 80vh;
		background-size: cover;
		display: grid;
	}

	.hidden-zone {
		background-color: slateblue;
	}
</style>
