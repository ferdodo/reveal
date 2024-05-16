
export function incrementDate(dateString: string): string {
	const date = new Date(dateString);
	date.setDate(date.getDate() + 1);
	return date.toISOString().slice(0, 10);
}