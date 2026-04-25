function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

const variants = {
  info: "border-slate-200 bg-slate-50 text-slate-800",
  error: "border-rose-200 bg-rose-50 text-rose-800",
};

export default function Alert({ variant = "info", className, children }) {
  return (
    <div className={classNames("rounded-2xl border p-6 text-sm", variants[variant] ?? variants.info, className)}>
      {children}
    </div>
  );
}

