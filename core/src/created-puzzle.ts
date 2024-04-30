import { Observable, Subject, combineLatest, map, tap } from "rxjs";
import { Puzzle } from "core";

const date$: Subject<string> = new Subject();
const imageURL$: Subject<string> = new Subject();

export function setCreatedPuzzleDate(date: string): void {
	date$.next(date);
}

export function setCreatedPuzzleImageURL(url: string): void {
	imageURL$.next(url);
}

export const createdPuzzle$: Observable<Puzzle> = combineLatest(
	date$,
	imageURL$
).pipe(
	map(([startDate, imageURL]) => ({ imageURL, startDate }))
);
