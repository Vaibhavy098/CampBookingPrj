import { useState } from "react";
import { FiSearch, FiCalendar, FiTag } from "react-icons/fi";
import bookingService from "../../services/bookingService";
import {
  formatDate,
  formatCurrency,
  getBookingStatusLabel,
  getBookingStatusColor,
} from "../../utils/formatters";
import Button from "../common/Button";

function BookingLookup() {
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = reference.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setBooking(null);
    setError(null);
    try {
      const data = await bookingService.getByReference(trimmed);
      setBooking(data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "No booking found with that reference number."
          : err.response?.status === 403
            ? "You do not have access to this booking."
            : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="mb-1 text-base font-bold text-slate-800">
        Find Booking by Reference
      </h2>
      <p className="mb-5 text-sm text-slate-500">
        Enter your 8-character booking reference to look up any reservation.
      </p>

      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value.toUpperCase())}
          placeholder="e.g. AB12CD34"
          maxLength={8}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
        />
        <Button
          type="submit"
          disabled={loading || reference.trim().length === 0}
        >
          <FiSearch className="mr-2" />
          {loading ? "Searching…" : "Find"}
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
      )}

      {booking && (
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">{booking.campName}</h3>
              <p className="mt-0.5 font-mono text-xs text-slate-400">
                {booking.bookingReference}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${getBookingStatusColor(booking.status)}`}
            >
              {getBookingStatusLabel(booking.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400">Check In</p>
                <p className="font-medium text-slate-700">
                  {formatDate(booking.checkInDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiCalendar className="text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400">Check Out</p>
                <p className="font-medium text-slate-700">
                  {formatDate(booking.checkOutDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiTag className="text-emerald-500" />
              <div>
                <p className="text-xs text-slate-400">Total</p>
                <p className="font-bold text-emerald-700">
                  {formatCurrency(booking.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingLookup;
