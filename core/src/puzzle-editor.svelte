<script lang="ts">
	import { onDestroy, getContext } from 'svelte';

	import {
		Puzzle,
		handleInputValue,
		Context,
		SavingPuzzleState,
		getTodayDate,
		defaultContextId,
		createdPuzzle$,
		setCreatedPuzzleImageURL,
		setCreatedPuzzleDate,
		saveEditedPuzzle,
		savingPuzzle$,
		getSavingPuzzle
	} from "core";

	export let dataTestid = undefined;
	export let contextId = defaultContextId;

	const context = getContext(contextId) as Context;
	const todayDate = getTodayDate(context.dateStorage);
	let savingPuzzleState: SavingPuzzleState = getSavingPuzzle();
	const subSav = savingPuzzle$.subscribe((value: SavingPuzzleState) => savingPuzzleState = value);
	let puzzle: Puzzle | null = null;
	let savedPuzzle: Puzzle | null = null;
	const sub = createdPuzzle$.subscribe((value: Puzzle) => puzzle = value);

	context.puzzleStorage.read()
		.then(value => savedPuzzle = value)
		.catch(console.error);

	let sub3 = context.puzzleStorage.watch()
		.subscribe(value => savedPuzzle = value);

	setCreatedPuzzleDate(todayDate);

	onDestroy(() => sub.unsubscribe());
	onDestroy(() => subSav.unsubscribe());
	onDestroy(() => sub3.unsubscribe());
</script>

{#if !savedPuzzle}
	<cookies-panel panel-title="Editer le puzzle" data-testid={dataTestid}>
		<cookies-p>
			Chaque jour, une nouvelle partie d'une image est dévoilée.
			Les participants doivent deviner quelle est cette image.
		</cookies-p>

		<cookies-p>
			Fournissez un lien direct vers l'image que vous souhaitez utiliser pour le puzzle.
			Cliquez sur créer, et partagez ensuite le lien de l'énigme avec les participants.
		</cookies-p>

		<input
			aria-label="image-url-input"
			type="text"
			on:input={ e => handleInputValue(setCreatedPuzzleImageURL)(e) } />

		<button
			disabled={ !puzzle && savingPuzzleState !== SavingPuzzleState.Pending }
			aria-label="puzzle-save-button"
			on:click={ () => saveEditedPuzzle(context, puzzle) }>
			Creer le puzzle
		</button>

		{#if savingPuzzleState === SavingPuzzleState.Pending }
			<cookies-p>
				Lien en cours de vérification...
			</cookies-p>
		{/if}

		{#if savingPuzzleState === SavingPuzzleState.UnknownError }
			<cookies-p>
				Le lien de l'image que vous avez fourni ne semble pas fonctionner.
			</cookies-p>
			
			<cookies-p>
				Il est possible que le serveur qui héberge cette image ne permette
				pas qu'elle soit affichée sur un autre site web, ce qu'on appelle
				une erreur de CORS (Cross-Origin Resource Sharing).
			</cookies-p>

			<cookies-p>
				Pour résoudre ce problème, vous pouvez essayer d'utiliser un proxy CORS.
				Un proxy CORS agit comme un intermédiaire entre votre site web et l'image,
				permettant ainsi de contourner les restrictions du serveur. Vous pouvez
				facilement trouver un service en ligne gratuit pour générer un lien proxy.
			</cookies-p>

			<cookies-p>
				Il est également possible que le lien lui-même soit invalide. Veuillez vérifier
				que le lien est correct et qu'il s'agit bien d'une image valide.
			</cookies-p>
		{/if}
	</cookies-panel>
{/if}
