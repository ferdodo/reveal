import { DateStorage } from "core";

export function getTodayDate(dateStorage: DateStorage): string {
	const today = dateStorage.read();
	const date = `${today.getDate()}`.padStart(2, '0');
	const month = `${today.getMonth() + 1}`.padStart(2, '0');
	const year = today.getFullYear();
	return year + "-" + month + "-" + date;
}
