import { test, expect } from "vitest";
import { incrementDate } from "core";

test("increment date", function () {
    const date = "2021-01-01";
    const nextDate = incrementDate(date);
    expect(nextDate).toBe("2021-01-02");
});

test("increment date with a month change", function () {
    const date = "2021-01-31";
    const nextDate = incrementDate(date);
    expect(nextDate).toBe("2021-02-01");
});

test("increment date with a year change", function () {
    const date = "2020-12-31";
    const nextDate = incrementDate(date);
    expect(nextDate).toBe("2021-01-01");
});