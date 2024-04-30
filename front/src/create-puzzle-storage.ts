import { validator } from "@exodus/schemasafe";
import { PuzzleStorage, Puzzle } from "core";
import { Subject, concatMap, from } from "rxjs";

const _puzzle$: Subject<Puzzle> = new Subject();

const puzzleSchema = {
	type: "object",
	required: [
		"imageURL",
		"startDate"
	],
	properties: {
		imageURL: {
			type: "string",
			title: "Image URL",
			description: "Url of the image for the puzzle",
			minLength: 13,
			maxLength: 400,
			pattern: "^([a-zA-Z:\/\.\?0-9\-\+\=\&\%\_])+$"
		},
		startDate: {
			type: "string",
			title: "Start date",
			description: "Start date of the puzzle",
			minLength: 10,
			maxLength: 10,
			pattern: "^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$"
		}
	},
	additionalProperties: false
};

export function createPuzzleStorage(): PuzzleStorage {
	return {
		async read(): Promise<Puzzle | null> {
			const url: URL = new URL(window.location.href);
			const urlEncodedPuzzle: string | null = url.searchParams.get("puzzle");

			if (urlEncodedPuzzle === null) {
				return null;
			}

			const stringifiedPuzzle: string = atob(urlEncodedPuzzle);
			const puzzle = JSON.parse(stringifiedPuzzle) as Puzzle;
			await this.check(puzzle);
			return puzzle;
		},
		async save(puzzle: Puzzle) {
			await this.check(puzzle);
			const stringifiedPuzzle: string = JSON.stringify(puzzle);
			const urlEncodedPuzzle = btoa(stringifiedPuzzle);
			const url: URL = new URL(window.location.href);
			url.searchParams.set("puzzle", urlEncodedPuzzle);
			window.history.pushState({}, "", url.href);
			_puzzle$.next(puzzle);
		},
		async check(puzzle: Puzzle) {
			const validatePuzzle = validator(puzzleSchema, { includeErrors: true });
			const result: boolean = validatePuzzle(puzzle as any);

			if (!result) {
				throw new Error(
					"Json-schema validation failed ! \n"
						+ JSON.stringify(validatePuzzle.errors, null, 4)
				);
			}

			const response: Response = await fetch(puzzle.imageURL);

			if (!response.ok) {
				throw new Error("Failed to fetch the image !");
			}

			const contentType: string | null = response.headers.get("content-type");

			if (!contentType?.startsWith("image")) {
				throw new Error("Bad content type !");
			}
		},
		watch() {
			return _puzzle$.asObservable()
		},
		async readImageDataURL(puzzle: Puzzle) {
			const response = await fetch(puzzle.imageURL);
			const blob = await response.blob();

			return await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		},
		watchImageDataURL() {
			return this.watch()
				.pipe(
					concatMap(puzzle => from(this.readImageDataURL(puzzle)))
				)
		},
		getImageSize(dataUrl: string) {
			const img = new Image();
			img.src = dataUrl;

			return new Promise((resolve, reject) => {
				img.onload = () => {
					resolve([img.width, img.height]);
				};
				
				img.onerror = () => {
					reject(new Error('Erreur lors du chargement de l\'image'));
				};
			});
		}
	};
}
