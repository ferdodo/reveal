import { DateStorage, createDateStorageMock, getTodayDate } from "core";
import { test, expect } from "vitest";


test("should get today date as iso date", function () {
    const dateStorage = createDateStorageMock();
    const date = new Date("2021-01-01");
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(0);
    expect(date.getFullYear()).toBe(2021);
    dateStorage.save(date);
    const today = getTodayDate(dateStorage);
    expect(today).toBe("2021-01-01");
});