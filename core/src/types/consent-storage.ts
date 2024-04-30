import { Observable } from "rxjs";

export interface ConsentStorage {
	save: (consent: boolean) => void;
	read: () => boolean;
	watch: () => Observable<boolean>;
}
