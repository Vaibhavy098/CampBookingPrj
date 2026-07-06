import { useState } from "react";
import { FiCalendar, FiMapPin, FiTag, FiStar } from "react-icons/fi";
import {
  formatDate,
  formatCurrency,
  getBookingStatusLabel,
  getBookingStatusColor,
  canCancelBooking,
  canRateBooking,
} from "../../utils/formatters";
import Button from "../common/Button";

function BookingCard({
  booking,
  onCancel,
  onRate,
  onEditRate,
  cancelling,
  ratingInfo,
}) {
  const {
    id,
    bookingReference,
    campName,
    checkInDate,
    checkOutDate,
    totalAmount,
    status,
  } = booking;

  const statusColor = getBookingStatusColor(status);
  const statusLabel = getBookingStatusLabel(status);
  const cancellable = canCancelBooking(booking);
  const ratable = canRateBooking(booking);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{campName}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <FiTag className="text-emerald-500" />
            <span className="font-mono text-xs">{bookingReference}</span>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiCalendar className="shrink-0 text-emerald-500" />
          <div>
            <p className="text-xs text-slate-400">Check In</p>
            <p className="font-medium">{formatDate(checkInDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiCalendar className="shrink-0 text-emerald-500" />
          <div>
            <p className="text-xs text-slate-400">Check Out</p>
            <p className="font-medium">{formatDate(checkOutDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiMapPin className="shrink-0 text-emerald-500" />
          <div>
            <p className="text-xs text-slate-400">Total Amount</p>
            <p className="font-bold text-slate-900">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>
        {ratingInfo && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiStar className="shrink-0 text-amber-400" />
            <div>
              <p className="text-xs text-slate-400">Your Rating</p>
              <p className="font-medium text-slate-800">
                {"★".repeat(ratingInfo.stars)}
                {"☆".repeat(5 - ratingInfo.stars)}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {cancellable && (
          <Button
            variant="danger"
            onClick={() => onCancel(id)}
            disabled={cancelling === id}
            className="text-sm"
          >
            {cancelling === id ? "Cancelling…" : "Cancel Booking"}
          </Button>
        )}
        {ratable && !ratingInfo && (
          <Button
            variant="outline"
            onClick={() => onRate(booking)}
            className="text-sm"
          >
            Rate Stay
          </Button>
        )}
        {ratable && ratingInfo && (
          <Button
            variant="secondary"
            onClick={() => onEditRate(booking, ratingInfo)}
            className="text-sm"
          >
            <FiStar className="mr-1.5 text-amber-400" size={13} />
            Edit Rating
          </Button>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
