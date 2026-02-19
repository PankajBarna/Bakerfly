export default function Drawer({ open, onClose, title, children }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[var(--surface)] shadow-[var(--shadow)] transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          <button className="px-3 py-2 rounded-lg hover:bg-black/5" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-56px)]">{children}</div>
      </div>
    </div>
  );
}
