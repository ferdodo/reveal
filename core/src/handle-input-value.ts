type Handler = (value: string) => void

export function handleInputValue(handler: Handler) {
	return function(event: Event) {
		const target = event.target as HTMLInputElement;
		handler(target.value);
	};
}
