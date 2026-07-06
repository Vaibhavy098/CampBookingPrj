function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 focus:ring-emerald-500",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-400",

    outline:
      "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
                ${baseClasses}
                ${variants[variant]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
