import { ConsentStorage } from "core";
import { Subject } from "rxjs";

const consentLocalStorageKey = "consent";

export function createConsentStorage(): ConsentStorage {
	const _consent$: Subject<boolean> = new Subject();

	return {
		save(value) {
			localStorage.setItem(consentLocalStorageKey, `${value}`);
			_consent$.next(value);
		},
		read() {
			const value = localStorage.getItem(consentLocalStorageKey);
			return value === "true";
		},
		watch() {
			return _consent$.asObservable();
		}
	};
}
