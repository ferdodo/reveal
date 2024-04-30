import { Slot, puzzleSizeX, puzzleSizeY, puzzleSize, Puzzle, getTodayDate, randomizeArray } from "core";

function incrementDate(dateString: string): string {
	const date = new Date(dateString);
	date.setDate(date.getDate() + 1);
	return date.toISOString().slice(0, 10);
}

function generateDates(puzzle: Puzzle) {
	let last = puzzle.startDate;
	const dates = [last];

	for (let i = 1; i < puzzleSize; i++) {
		const next = incrementDate(last);
		dates.push(next);
		last = next;
	}

	return randomizeArray(puzzle, dates);
}

function * generateCurrentSlots(puzzle: Puzzle) {
	const dates = generateDates(puzzle)[Symbol.iterator]();
	const todayDate = getTodayDate();

	for (let gridX = 1; gridX <= puzzleSizeX; gridX++) {
		for (let gridY = 1; gridY <= puzzleSizeY; gridY++) {
			const hidden = dates.next().value > todayDate;
			yield { gridX, gridY, hidden };
		}
	}
}

let currentSlots;

export function getCurrentSlots(puzzle: Puzzle): Slot[] {
	if (currentSlots === undefined) {
		return currentSlots = [...generateCurrentSlots(puzzle)];
	}

	return currentSlots;
}
