export default function Input({ label, className = "", ...props }) {
  return (
    <div className={className}>
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <input
        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
        {...props}
      />
    </div>
  );
}
