function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

const variants = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  secondary: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
  danger: "border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classNames(
        "rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      )}
      {...props}
    />
  );
}

