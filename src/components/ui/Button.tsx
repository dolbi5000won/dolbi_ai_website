import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white shadow-[0_8px_24px_-10px_rgba(40,120,229,0.7)] hover:bg-[#1f6ad0] focus-visible:outline-brand-blue",
  secondary:
    "border border-line bg-white text-brand-navy hover:border-brand-navy focus-visible:outline-brand-blue",
  ghost:
    "border border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/10 focus-visible:outline-white",
  light:
    "bg-white text-brand-navy hover:bg-brand-cyan/90 focus-visible:outline-white",
};

const sizeClass: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
