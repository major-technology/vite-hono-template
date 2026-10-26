/**
 * A minimal client-side router on top of the History API. Swap in a full router if the app grows.
 */
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
	window.addEventListener("popstate", onChange);

	return () => window.removeEventListener("popstate", onChange);
};

export function usePathname(): string {
	return useSyncExternalStore(subscribe, () => window.location.pathname);
}

export function navigate(to: string) {
	window.history.pushState(null, "", to);
	window.dispatchEvent(new PopStateEvent("popstate"));
}
