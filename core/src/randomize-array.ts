import Randoma from "randoma";
import { Puzzle } from "core";

export function randomizeArray<T>(puzzle: Puzzle, arr: T[]): T[] {
	const seed = JSON.stringify(puzzle);
	const random = new Randoma({ seed });
	const result = [...arr];
	const n = result.length;

	for (let i = n - 1; i > 0; i--) {
		const j = random.integerInRange(0, i);
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}