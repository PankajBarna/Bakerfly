export default function Textarea({ label, className = "", ...props }) {
  return (
    <div className={className}>
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <textarea
        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm min-h-[96px]"
        {...props}
      />
    </div>
  );
}
