import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../components/ui/Logo";
import cn from "../../utils/cn";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-40 w-full transition-all duration-300",
				scrolled
					? "border-b border-(--color-primary)/10 bg-(--color-primary)/4 backdrop-blur-xl supports-backdrop-filter:bg-(--color-primary)/4"
					: "border-b border-transparent bg-(--color-background)",
			)}
		>
			<div className="flex h-16 items-center justify-between">
				<Link
					to="/"
					aria-label="UniHub Workshop home"
					className="transition-transform hover:scale-[1.02]"
				>
					<Logo />
				</Link>

				<nav className="hidden items-center gap-8 md:flex">
					<Link
						to="/"
						className="text-sm font-medium text-(--color-primary)/70 transition-colors hover:text-(--color-primary)"
					>
						Workshops
					</Link>
					<a
						href="#schedule"
						className="text-sm font-medium text-(--color-primary)/70 transition-colors hover:text-(--color-primary)"
					>
						Schedule
					</a>
				</nav>

				<Button variant="secondary" size="sm">
					Sign In
				</Button>
			</div>
		</header>
	);
}
