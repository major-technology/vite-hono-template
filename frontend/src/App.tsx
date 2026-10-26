/**
 * App shell: navigation plus the page for the current path.
 */
import { Link } from "./Link";
import { usePathname } from "./router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";

export function App() {
	const pathname = usePathname();

	return (
		<div className="container">
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>
			<main>{pathname === "/about" ? <AboutPage /> : <HomePage />}</main>
		</div>
	);
}
