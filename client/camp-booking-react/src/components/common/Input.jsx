import React from "react";

function Input({ label, icon, className = "", error, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          className={`
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        py-3
                        ${icon ? "pl-11" : "pl-4"}
                        pr-4
                        text-slate-700
                        outline-none
                        transition-all
                        duration-300
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-500
                        ${className}
                    `}
          {...props}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
