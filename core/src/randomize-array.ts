import Randoma from "randoma";
import { Puzzle } from "core";

function randomInteger(random, min: number, max: number): number {
	return random.integerInRange(min, max - 1);
}

export function randomizeArray<T>(puzzle: Puzzle, arr: T[]): T[] {
	const seed = JSON.stringify(puzzle);
	const random = new Randoma({ seed });	
	return [...arr].sort(() => randomInteger(random, 0, 2) - 0.5);
}
