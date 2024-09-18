import React from "react";
import { cn } from "../../utils/format";
import { cva } from "class-variance-authority";

const noteStatusVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    variant: {
      default: "bg-green-800",
      archived: "bg-yellow-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function NoteStatus({
  variant,
  className,
  children,
}: {
  variant?: "default" | "archived";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-neutral-800 py-1 pe-3 ps-2 text-sm">
      <div className={cn(noteStatusVariants({ variant, className }))}></div>
      {children}
    </span>
  );
}
