import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Site-wide button — implements the three Figma variants (primary / secondary /
 * tertiary) in both mode contexts (light section vs. dark section). Figma:
 * https://www.figma.com/design/6Xb41XhP4114oDSwlL57bT/New-Website?node-id=229-14696
 *
 * `mode` is which background the button sits on, not a user-facing theme — pass
 * "light" inside a white/light section, "dark" everywhere else (the site's
 * default background is dark).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium leading-6 whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "border border-solid",
        tertiary: "rounded-none",
      },
      mode: {
        light: "",
        dark: "",
      },
      size: {
        default: "px-6 py-3",
        // Tertiary is a plain text link inline with surrounding copy — it does not
        // carry the pill hit-box padding, only primary/secondary do (see Figma).
        tertiary: "",
      },
    },
    compoundVariants: [
      { variant: "primary", mode: "light", class: "bg-[#4B4DF7] text-white hover:bg-[#3133E7]" },
      { variant: "primary", mode: "dark", class: "bg-[#6366F8] text-white hover:bg-[#4B4DF7]" },
      { variant: "secondary", mode: "light", class: "border-[#888888] text-[#888888] hover:bg-[#4B4DF7]/20 hover:border-[#4B4DF7]/50 hover:text-[#4B4DF7]" },
      { variant: "secondary", mode: "dark", class: "border-[#4E4E4E] text-[#E6E6E6] hover:bg-[#8385FF]/20 hover:border-[#8385FF]/50 hover:text-[#8587FF]" },
      { variant: "tertiary", mode: "light", class: "text-[#6366F8] hover:text-[#3133E7]" },
      { variant: "tertiary", mode: "dark", class: "text-[#6366F8] hover:text-[#8587FF]" },
    ],
    defaultVariants: {
      variant: "primary",
      mode: "dark",
      size: "default",
    },
  }
);

const ArrowRightIcon = <ArrowRight aria-hidden="true" />;

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
  /** Defaults to a right-pointing arrow; pass `null` to omit, or your own icon node. */
  icon?: React.ReactNode | null;
  iconPosition?: "left" | "right";
};

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      mode,
      size,
      asChild = false,
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = icon === null ? null : icon ?? ArrowRightIcon;
    const resolvedSize = size ?? (variant === "tertiary" ? "tertiary" : "default");
    const variantClassName = cn(buttonVariants({ variant, mode, size: resolvedSize, className }));

    // Radix's Slot requires exactly one element child (it clones props onto it),
    // so when asChild is used we can't inject icon siblings around `children` —
    // the caller places its own icon inside the element it passes in.
    if (asChild) {
      return (
        <Slot className={variantClassName} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button className={variantClassName} ref={ref} {...props}>
        {iconPosition === "left" && resolvedIcon}
        {children}
        {iconPosition === "right" && resolvedIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
