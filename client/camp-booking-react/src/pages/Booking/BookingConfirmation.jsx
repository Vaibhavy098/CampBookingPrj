import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCalendar,
  FiTag,
  FiHome,
  FiList,
} from "react-icons/fi";
import bookingService from "../../services/bookingService";
import {
  formatDate,
  formatCurrency,
  getBookingStatusLabel,
  getBookingStatusColor,
} from "../../utils/formatters";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

function BookingConfirmation() {
  const { reference } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    bookingService
      .getByReference(reference)
      .then((data) => setBooking(data))
      .catch(() => setError("Booking not found or you do not have access."))
      .finally(() => setLoading(false));
  }, [reference]);

  if (loading) return <Loader size="lg" className="py-40" />;

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="mb-6 text-slate-500">{error}</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const nights =
    booking.checkInDate && booking.checkOutDate
      ? Math.round(
          (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) /
            86400000,
        )
      : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Success Banner */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <FiCheckCircle size={40} className="text-emerald-600" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-slate-500">
            Your reservation is confirmed. See you at camp!
          </p>
        </div>

        {/* Reference Card */}
        <div className="mb-6 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50 px-8 py-6 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Booking Reference
          </p>
          <p className="font-mono text-4xl font-extrabold tracking-widest text-emerald-700">
            {booking.bookingReference}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Save this reference to manage your booking
          </p>
        </div>

        {/* Booking Details */}
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {booking.campName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">Camp Details</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getBookingStatusColor(booking.status)}`}
            >
              {getBookingStatusLabel(booking.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <FiCalendar className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Check In</p>
                <p className="font-semibold text-slate-800">
                  {formatDate(booking.checkInDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <FiCalendar className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Check Out</p>
                <p className="font-semibold text-slate-800">
                  {formatDate(booking.checkOutDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <FiTag className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="font-semibold text-slate-800">
                  {nights} night{nights !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <FiTag className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Rate Per Night</p>
                <p className="font-semibold text-slate-800">
                  {formatCurrency(booking.pricePerNight)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  {formatCurrency(booking.pricePerNight)} × {nights} night
                  {nights !== 1 ? "s" : ""}
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-600">
                  Total Amount
                </p>
              </div>
              <p className="text-3xl font-extrabold text-emerald-700">
                {formatCurrency(booking.totalAmount)}
              </p>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Payment collected at check-in
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/my-bookings" className="flex-1">
            <Button variant="primary" fullWidth>
              <FiList className="mr-2" />
              View All My Bookings
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="secondary" fullWidth>
              <FiHome className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
