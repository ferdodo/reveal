import {
	Slot,
	puzzleSizeX,
	puzzleSizeY,
	Puzzle,
	getTodayDate,
	DateStorage,
	generateDates
} from "core";

function * generateCurrentSlots(puzzle: Puzzle, dateStorage: DateStorage) {
	const dates = generateDates(puzzle)[Symbol.iterator]();
	const todayDate = getTodayDate(dateStorage);

	for (let gridX = 1; gridX <= puzzleSizeX; gridX++) {
		for (let gridY = 1; gridY <= puzzleSizeY; gridY++) {
			const slotDate = dates.next().value;
			const hidden = slotDate > todayDate;
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
