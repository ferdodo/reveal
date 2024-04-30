export function calculateDaysDifference(date1: string, date2: string): number {
	const oneDay = 24 * 60 * 60 * 1000;
	const firstDate = new Date(date1);
	const secondDate = new Date(date2);
	const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
	return diffDays;
}
