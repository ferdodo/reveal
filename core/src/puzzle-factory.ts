import { Puzzle } from "core";

export class PuzzleFactory {
	build(): Puzzle {
		return {
			imageURL: "",
			startDate: "2021-01-01"
		}
	}
}
