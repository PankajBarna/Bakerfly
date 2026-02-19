export default function Button({ as: Comp = "button", className = "", variant = "solid", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] focus-visible:outline-none";
  const solid =
    "bg-[var(--text)] text-[var(--surface)] shadow-[var(--shadow)] hover:opacity-95";
  const outline =
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[rgba(0,0,0,0.03)]";
  const brand =
    "bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-[var(--text)] shadow-[var(--shadow)] hover:opacity-95";
  const styles = variant === "outline" ? outline : variant === "brand" ? brand : solid;

  return <Comp className={`${base} ${styles} ${className}`} {...props} />;
}
