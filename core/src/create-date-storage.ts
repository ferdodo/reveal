import { DateStorage } from "core";

export function createDateStorage(): DateStorage {
    let date = new Date();

    return {
        read() {
            return date
        }
    };
}