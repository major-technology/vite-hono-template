/**
 * A sidebar nav link that navigates client-side instead of reloading the page.
 */
import type { MouseEvent, ReactNode } from "react";
import { cn } from "./lib/utils";
import { navigate } from "./router";

export function Link({ to, active, children }: { to: string; active: boolean; children: ReactNode }) {
	const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
			return;
		}

		event.preventDefault();
		navigate(to);
	};

	return (
		<a
			href={to}
			onClick={onClick}
			className={cn(
				"rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground",
				active && "bg-background text-foreground shadow-xs ring-1 ring-border",
			)}
		>
			{children}
		</a>
	);
}
