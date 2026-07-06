function RatingStars({ rating = 0, totalRatings, size = "sm" }) {
  const textSize = { sm: "text-sm", md: "text-base", lg: "text-xl" }[size];
  const filled = Math.round(rating);

  return (
    <div className={`flex items-center gap-0.5 ${textSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= filled ? "text-amber-400" : "text-slate-200"}
        >
          ★
        </span>
      ))}
      <span className="ml-1.5 font-semibold text-slate-700">
        {rating > 0 ? Number(rating).toFixed(1) : "New"}
      </span>
      {totalRatings !== undefined && (
        <span className="text-slate-400">({totalRatings})</span>
      )}
    </div>
  );
}

export default RatingStars;
