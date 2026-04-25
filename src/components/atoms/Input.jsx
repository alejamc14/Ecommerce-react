function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function Input({ className, ...props }) {
  return (
    <input
      className={classNames(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400",
        className,
      )}
      {...props}
    />
  );
}

