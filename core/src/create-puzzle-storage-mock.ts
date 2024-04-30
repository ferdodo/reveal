import { PuzzleStorage, Puzzle } from "core";
import { Subject, concatMap, from } from "rxjs";

const _puzzle$: Subject<Puzzle> = new Subject();

export function createPuzzleStorageMock(): PuzzleStorage {
	let puzzle = null;

	return {
		save(value) {
			puzzle = value;
			_puzzle$.next(value);
			return Promise.resolve();
		},
		read() {
			return Promise.resolve(puzzle);
		},
		watch() {
			return _puzzle$.asObservable();
		},
		check() {
			return Promise.resolve();
		},
		readImageDataURL() {
			return Promise.resolve("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=");
		},
		watchImageDataURL() {
			return _puzzle$.pipe(
				concatMap(value => from<string>(this.readImageDataURL()))
			)
		},
		getImageSize() {
			return Promise.resolve([10, 10]);
		}
	};
}
