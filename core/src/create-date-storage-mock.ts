import { DateStorage } from 'core';

export function createDateStorageMock(): DateStorage {
    let date = new Date();

    return {
        read() {
            return date
        },
        save(newDate: Date) {
            date = newDate;
        }
    };
}