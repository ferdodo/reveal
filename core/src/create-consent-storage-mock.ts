import { ConsentStorage } from "core";
import { Subject } from "rxjs";

export function createConsentStorageMock(): ConsentStorage {
	let consent = false;
	const _consent$: Subject<boolean> = new Subject();

	return {
		save(value) {
			consent = value;
			_consent$.next(value);
		},
		read() {
			return consent;
		},
		watch() {
			return _consent$.asObservable();
		}
	};
}
