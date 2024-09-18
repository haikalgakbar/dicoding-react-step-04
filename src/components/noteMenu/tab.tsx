import { cn } from "../../utils/format";
import { cva } from "class-variance-authority";

const tabVariants = cva("rounded-lg px-2 py-1 hover:cursor-pointer", {
  variants: {
    variant: {
      default: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700",
      active: "bg-neutral-200 text-neutral-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function Tab({
  onClick,
  variant,
  className,
  children,
}: {
  onClick: () => void;
  variant?: "default" | "active";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(tabVariants({ variant, className }))}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
