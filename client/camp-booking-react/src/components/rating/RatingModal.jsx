import { useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "../common/Button";

function RatingModal({
  booking,
  onSubmit,
  onClose,
  submitting,
  editMode = false,
  initialStars = 0,
  initialReview = "",
  ratingId,
}) {
  const [stars, setStars] = useState(editMode ? initialStars : 0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState(editMode ? initialReview : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stars === 0) return;
    if (editMode) {
      onSubmit({ ratingId, stars, review: review.trim() || null });
    } else {
      onSubmit({ bookingId: booking.id, stars, review: review.trim() || null });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {editMode ? "Edit Your Rating" : "Rate Your Stay"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{booking.campName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Your Rating <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setStars(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="text-4xl transition-transform hover:scale-110 focus:outline-none"
                >
                  <span
                    className={
                      star <= (hovered || stars)
                        ? "text-amber-400"
                        : "text-slate-200"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            {stars === 0 && (
              <p className="mt-2 text-xs text-red-500">
                Please select a star rating
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Review{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="Share your experience…"
              className="w-full resize-none rounded-xl border border-slate-300 p-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              disabled={stars === 0 || submitting}
            >
              {submitting ? "Submitting…" : "Submit Rating"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingModal;
