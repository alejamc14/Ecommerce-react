function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Badge({ className, children }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-md bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

