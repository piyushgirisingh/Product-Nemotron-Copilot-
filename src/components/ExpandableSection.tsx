import { useState, ReactNode } from "react";
import { cn } from "./ui/utils";

interface ExpandableSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function ExpandableSection({
  title,
  defaultOpen = true,
  children,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="mb-6 rounded-xl border border-[var(--lc-border)] bg-[var(--lc-surface-soft)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-sm font-medium text-[var(--lc-text)] hover:bg-[var(--lc-surface)] transition-colors duration-150"
        )}
      >
        <span>{title}</span>
        <span
          className={cn(
            "inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--lc-border)] text-[10px] text-[var(--lc-muted)] transition-transform",
            open ? "rotate-90" : "rotate-0"
          )}
        >
          ▸
        </span>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-[var(--lc-text)]">
          {children}
        </div>
      </div>
    </section>
  );
}

