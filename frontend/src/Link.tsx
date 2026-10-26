/**
 * An anchor that navigates client-side instead of reloading the page.
 */
import type { MouseEvent, ReactNode } from "react";
import { navigate } from "./router";

export function Link({ to, children }: { to: string; children: ReactNode }) {
	const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
			return;
		}

		event.preventDefault();
		navigate(to);
	};

	return (
		<a href={to} onClick={onClick} className="hover:underline">
			{children}
		</a>
	);
}
