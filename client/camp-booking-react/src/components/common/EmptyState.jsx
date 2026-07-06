function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-3xl text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold text-slate-700">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-slate-500">{description}</p>
      )}
      {action && action}
    </div>
  );
}

export default EmptyState;
