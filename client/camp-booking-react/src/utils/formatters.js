import dayjs from "dayjs";

export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
  return dayjs(date).format("MMM DD, YYYY");
};

export const formatDateInput = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "";
  return `${baseUrl}${imageUrl}`;
};

export const getBookingStatusLabel = (status) => {
  const statusMap = {
    1: "Pending",
    2: "Confirmed",
    3: "Cancelled",
    4: "Completed",
  };
  return statusMap[status] || "Unknown";
};

export const getBookingStatusColor = (status) => {
  const colorMap = {
    1: "text-amber-700 bg-amber-50 border-amber-200",
    2: "text-emerald-700 bg-emerald-50 border-emerald-200",
    3: "text-red-700 bg-red-50 border-red-200",
    4: "text-slate-600 bg-slate-100 border-slate-200",
  };
  return colorMap[status] || "text-slate-600 bg-slate-100 border-slate-200";
};

export const canCancelBooking = (booking) => {
  const isCancellable = booking.status === 1 || booking.status === 2;
  const isFuture = dayjs(booking.checkInDate).isAfter(dayjs());
  return isCancellable && isFuture;
};

export const canRateBooking = (booking) => {
  return booking.status === 4;
};
