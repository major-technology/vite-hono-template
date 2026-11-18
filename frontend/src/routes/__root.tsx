/**
 * App shell: sidebar navigation and the signed-in user around every page. The page for the current URL renders in <Outlet />.
 */
import { useEffect, useState } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import type { CurrentUserResponse, User } from "shared";
import { getJson } from "../lib/api";

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: () => <p className="text-muted-foreground">Page not found.</p>,
});

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/about", label: "About" },
] as const;

function RootLayout() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		getJson<CurrentUserResponse>("/api/me")
			.then((body) => setUser(body.user))
			.catch(() => setUser(undefined));
	}, []);

	return (
		<div className="flex min-h-screen flex-col font-sans md:flex-row">
			<aside className="flex shrink-0 items-center gap-4 border-b bg-sidebar px-3 py-3 text-sidebar-foreground md:w-56 md:flex-col md:items-stretch md:border-r md:border-b-0 md:py-4">
				<span className="px-2 font-semibold">My app</span>
				<nav className="flex gap-1 md:flex-col">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							// "/" prefixes every path, so Home is active only on itself.
							activeOptions={{ exact: item.to === "/" }}
							className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
							activeProps={{ className: "bg-background text-foreground shadow-xs ring-1 ring-border" }}
						>
							{item.label}
						</Link>
					))}
				</nav>
				{user && (
					<div className="ml-auto flex min-w-0 items-center gap-2.5 px-2 md:mt-auto md:ml-0">
						<span className="grid size-7 shrink-0 place-items-center rounded-full bg-sidebar-accent text-xs font-semibold">
							{user.name.slice(0, 1).toUpperCase()}
						</span>
						<div className="hidden min-w-0 text-sm leading-tight md:block">
							<p className="truncate">{user.name}</p>
							<p className="truncate text-muted-foreground">{user.email}</p>
						</div>
					</div>
				)}
			</aside>
			<main className="flex min-w-0 flex-1 flex-col p-6 md:p-8">
				<Outlet />
			</main>
		</div>
	);
}
