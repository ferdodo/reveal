export function getTodayDate(): string {
	const today = new Date();
	const date = today.getDate();
	const month = `${today.getMonth() + 1}`.padStart(2, '0');
	const year = today.getFullYear();
	return year + "-" + month + "-" + date;
}
