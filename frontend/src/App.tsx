/**
 * App shell: sidebar navigation and the signed-in user, plus the page for the current path.
 */
import { useEffect, useState } from "react";
import type { CurrentUserResponse, User } from "shared";
import { Link } from "./Link";
import { usePathname } from "./router";
import { getJson } from "./lib/api";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";

const navItems = [
	{ to: "/", label: "Home" },
	{ to: "/about", label: "About" },
];

export function App() {
	const pathname = usePathname();
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
						<Link key={item.to} to={item.to} active={pathname === item.to}>
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
				{pathname === "/about" ? <AboutPage /> : <HomePage />}
			</main>
		</div>
	);
}
