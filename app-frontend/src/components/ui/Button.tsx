import {
	type ButtonHTMLAttributes,
	cloneElement,
	forwardRef,
	isValidElement,
	type ReactElement,
} from "react";
import cn from "../../utils/cn";
import Loader from "../icons/Loader";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "gradient";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	asChild?: boolean;
	loading?: boolean;
}

const variants: Record<Variant, string> = {
	primary:
		"bg-(--color-primary) text-white hover:bg-[#295750] shadow-[0_2px_10px_rgba(49,103,95,0.25)]",
	secondary:
		"border border-(--color-secondary) text-(--color-secondary) bg-transparent hover:bg-(--color-secondary)/10",
	ghost: "text-(--color-primary) hover:bg-(--color-primary)/5",
	danger: "bg-(--color-primary) text-white hover:opacity-90 shadow-[0_2px_10px_rgba(208,69,76,0.25)]",
	gradient:
		"text-white bg-gradient-to-r from-(--color-primary) to-(--color-secondary) hover:brightness-105 shadow-[0_6px_20px_rgba(22,151,189,0.3)]",
};

const sizes: Record<Size, string> = {
	sm: "h-9 px-3 text-sm gap-1.5",
	md: "h-11 px-5 text-sm gap-2",
	lg: "h-14 px-7 text-base gap-2.5",
};

const base = cn(
	"inline-flex items-center justify-center rounded-(--border-radius) font-medium",
	"transition-all duration-200 ease-out active:scale-[0.97]",
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-secondary) focus-visible:ring-offset-2",
	"disabled:pointer-events-none disabled:opacity-50 select-none",
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "primary",
			size = "md",
			asChild,
			loading,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const classes = cn(base, variants[variant], sizes[size], className);

		if (asChild && isValidElement(children)) {
			const child = children as ReactElement<{ className?: string }>;
			return cloneElement(child, {
				className: cn(classes, child.props.className),
			});
		}

		return (
			<button
				ref={ref}
				className={classes}
				disabled={disabled || loading}
				{...props}
			>
				{loading && <Loader className="h-4 w-4 animate-spin" />}
				{children}
			</button>
		);
	},
);
