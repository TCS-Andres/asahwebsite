import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-terracotta text-white hover:brightness-95 hover:shadow-soft-lg",
  outline:
    "border-2 border-sage text-sage hover:bg-sage hover:text-white hover:shadow-soft",
};

interface BaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

interface AnchorButtonProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string;
}

interface NativeButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

/*
  Button renders a Next.js Link when an href is provided, otherwise a native
  button element. Pass variant "primary" for the terracotta CTA or "outline"
  for the sage bordered secondary action.
*/
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, href, ...rest } = props;
    void _v;
    void _c;
    void _ch;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  void _v;
  void _c;
  void _ch;
  void _h;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
