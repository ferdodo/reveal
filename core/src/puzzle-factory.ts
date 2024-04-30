import { Puzzle } from "core";

export class PuzzleFactory {
	build(): Puzzle {
		return {
			imageURL: "",
			startDate: ""
		}
	}
}
