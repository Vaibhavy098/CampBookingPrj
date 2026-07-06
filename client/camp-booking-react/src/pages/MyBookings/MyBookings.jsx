import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import bookingService from "../../services/bookingService";
import ratingService from "../../services/ratingService";
import BookingCard from "../../components/booking/BookingCard";
import BookingLookup from "../../components/booking/BookingLookup";
import RatingModal from "../../components/rating/RatingModal";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [ratingBooking, setRatingBooking] = useState(null);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  // Track ratings submitted this session: { [bookingId]: { ratingId, stars, review } }
  const [ratedBookings, setRatedBookings] = useState({});
  // editMode context: { booking, ratingInfo }
  const [editRatingContext, setEditRatingContext] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data ?? []);
    } catch {
      toast.error("Could not load bookings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id) => {
    setCancelling(id);
    try {
      await bookingService.cancel(id);
      toast.success("Booking cancelled.");
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel booking.");
    } finally {
      setCancelling(null);
    }
  };

  const handleRateSubmit = async (payload) => {
    setRatingSubmitting(true);
    try {
      const response = await ratingService.create(payload);
      toast.success("Thank you for your review!");
      setRatedBookings((prev) => ({
        ...prev,
        [payload.bookingId]: {
          ratingId: response.id,
          stars: payload.stars,
          review: payload.review || "",
        },
      }));
      setRatingBooking(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit rating.");
    } finally {
      setRatingSubmitting(false);
    }
  };

  const handleEditRateSubmit = async (payload) => {
    setRatingSubmitting(true);
    try {
      await ratingService.update(payload.ratingId, {
        Stars: payload.stars,
        Review: payload.review || null,
      });
      toast.success("Rating updated!");
      setRatedBookings((prev) => ({
        ...prev,
        [editRatingContext.booking.id]: {
          ...prev[editRatingContext.booking.id],
          stars: payload.stars,
          review: payload.review || "",
        },
      }));
      setEditRatingContext(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update rating.");
    } finally {
      setRatingSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              My Bookings
            </h1>
            <p className="mt-1 text-slate-500">
              Manage and track all your camp reservations
            </p>
          </div>
          <Link to="/#featured">
            <Button variant="outline">Browse More Camps</Button>
          </Link>
        </div>

        <BookingLookup />

        {loading ? (
          <Loader size="lg" className="py-20" />
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={<FiCalendar />}
            title="No bookings yet"
            description="You haven't made any reservations. Start exploring camps!"
            action={
              <Link to="/#featured">
                <Button>Browse Camps</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                onRate={setRatingBooking}
                onEditRate={(b, ri) =>
                  setEditRatingContext({ booking: b, ratingInfo: ri })
                }
                cancelling={cancelling}
                ratingInfo={ratedBookings[booking.id] ?? null}
              />
            ))}
          </div>
        )}
      </div>

      {ratingBooking && (
        <RatingModal
          booking={ratingBooking}
          onSubmit={handleRateSubmit}
          onClose={() => setRatingBooking(null)}
          submitting={ratingSubmitting}
        />
      )}

      {editRatingContext && (
        <RatingModal
          booking={editRatingContext.booking}
          onSubmit={handleEditRateSubmit}
          onClose={() => setEditRatingContext(null)}
          submitting={ratingSubmitting}
          editMode
          initialStars={editRatingContext.ratingInfo.stars}
          initialReview={editRatingContext.ratingInfo.review}
          ratingId={editRatingContext.ratingInfo.ratingId}
        />
      )}
    </div>
  );
}

export default MyBookings;
