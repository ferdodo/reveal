<script lang="ts">
	import { onDestroy, getContext } from 'svelte';
	import { Context, Puzzle, defaultContextId } from "core";

	export let dataTestid = undefined;
	export let contextId = defaultContextId;

	const context = getContext(contextId) as Context;
	let puzzle: Puzzle | null = null;
	let consent = context.consentStorage.read();

	const sub = context.puzzleStorage.watch()
		.subscribe(
			value => puzzle = value,
			console.error
		);

	context.puzzleStorage.read()
		.then(value => puzzle = value)
		.catch(console.error);

	const sub2 = context.consentStorage.watch()
		.subscribe(
			value => consent = value,
			console.error
		);

	onDestroy(() => sub.unsubscribe());
	onDestroy(() => sub2.unsubscribe());
</script>

{#if puzzle && !consent}
	<cookies-panel panel-title="Avertissement" data-testid={dataTestid}>
		<cookies-p>
			Les images utilisées dans ces énigmes proviennent de sites web externes.
			Leur sécurité, confidentialité et moralité ne pouvant être vérifiées, il
			est recommandé de faire preuve d'autant de vigilance lors de l'ouverture
			d'une enigme que lorsque vous ouvrez n'importe quel lien.
		</cookies-p>

		<cookies-button
			on:click={ () => context.consentStorage.save(true) }
		>
			Je fais confiance aux personnes qui partagent des énigmes.
		</cookies-button>
	</cookies-panel>
{/if}
