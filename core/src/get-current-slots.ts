import {
	Slot,
	puzzleSizeX,
	puzzleSizeY,
	puzzleSize,
	Puzzle,
	getTodayDate,
	randomizeArray,
	DateStorage,
	incrementDate
} from "core";

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

function * generateCurrentSlots(puzzle: Puzzle, dateStorage: DateStorage) {
	const dates = generateDates(puzzle)[Symbol.iterator]();
	const todayDate = getTodayDate(dateStorage);

	for (let gridX = 1; gridX <= puzzleSizeX; gridX++) {
		for (let gridY = 1; gridY <= puzzleSizeY; gridY++) {
			const hidden = dates.next().value > todayDate;
			yield { gridX, gridY, hidden };
		}
	}
}

let currentSlots;

export function getCurrentSlots(puzzle: Puzzle, dateStorage: DateStorage): Slot[] {
	if (currentSlots === undefined) {
		return currentSlots = [...generateCurrentSlots(puzzle, dateStorage)];
	}

	return currentSlots;
}
