import { puzzleSize, Puzzle, randomizeArray, incrementDate } from "core";

export function generateDates(puzzle: Puzzle) {
	let last = puzzle.startDate;
	const dates = [last];

	for (let i = 1; i < puzzleSize; i++) {
		const next = incrementDate(last);
		dates.push(next);
		last = next;
	}

	return randomizeArray(puzzle, dates);
}