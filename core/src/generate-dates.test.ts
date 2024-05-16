import { generateDates, PuzzleFactory, puzzleSizeX, puzzleSizeY, incrementDate } from "core";
import { test, expect } from "vitest";

test("should generate string array", function() {
    const puzzleFactory = new PuzzleFactory();
    const puzzle = puzzleFactory.build();
    const result = generateDates(puzzle);
    expect(result).toBeInstanceOf(Array);
    expect(new Set(result).size).toBe(puzzleSizeX * puzzleSizeY);

    let date = puzzle.startDate;

    for (let i = 0; i < puzzleSizeX * puzzleSizeY; i++) {
        expect(result.includes(date)).toBeTruthy();
        date = incrementDate(date);
    }
});