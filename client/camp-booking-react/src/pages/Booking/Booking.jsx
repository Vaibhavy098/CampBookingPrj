import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiArrowLeft,
} from "react-icons/fi";
import campService from "../../services/campService";
import bookingService from "../../services/bookingService";
import { useAuth } from "../../hooks/useAuth";
import {
  formatCurrency,
  formatDate,
  getImageUrl,
} from "../../utils/formatters";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import dayjs from "dayjs";

function Booking() {
  const { campId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [camp, setCamp] = useState(null);
  const [campLoading, setCampLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/book/${campId}` } });
      return;
    }
    campService
      .getById(campId)
      .then((data) => setCamp(data))
      .catch(() => {
        toast.error("Camp not found.");
        navigate("/");
      })
      .finally(() => setCampLoading(false));
  }, [campId, isAuthenticated, navigate]);

  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { checkInDate: today, checkOutDate: tomorrow },
  });

  const checkIn = watch("checkInDate");
  const checkOut = watch("checkOutDate");

  const nights =
    checkIn && checkOut && dayjs(checkOut).isAfter(dayjs(checkIn))
      ? dayjs(checkOut).diff(dayjs(checkIn), "day")
      : 0;

  const onSubmit = async (data) => {
    try {
      const booking = await bookingService.create({
        CampId: Number(campId),
        CheckInDate: data.checkInDate,
        CheckOutDate: data.checkOutDate,
        BillingAddress: data.billingAddress,
        CellPhone: data.cellPhone,
      });
      toast.success(
        "Booking confirmed successfully! Redirecting to your confirmation...",
      );
      navigate(`/booking/confirmation/${booking.bookingReference}`);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.response?.data?.title ||
        "Booking failed. Please try again.";
      toast.error(message);
    }
  };

  if (campLoading) {
    return <Loader size="lg" className="py-40" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <FiArrowLeft />
          Back
        </button>

        <h1 className="mb-8 text-3xl font-extrabold text-slate-900">
          Complete Your Booking
        </h1>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <h2 className="mb-6 text-lg font-bold text-slate-800">
                Stay Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Check In"
                    type="date"
                    icon={<FiCalendar />}
                    min={today}
                    error={errors.checkInDate?.message}
                    {...register("checkInDate", {
                      required: "Check-in date is required",
                      validate: (v) =>
                        !dayjs(v).isBefore(dayjs(), "day") ||
                        "Check-in must be today or later",
                    })}
                  />
                  <Input
                    label="Check Out"
                    type="date"
                    icon={<FiCalendar />}
                    min={checkIn || today}
                    error={errors.checkOutDate?.message}
                    {...register("checkOutDate", {
                      required: "Check-out date is required",
                      validate: (v) =>
                        dayjs(v).isAfter(dayjs(checkIn)) ||
                        "Check-out must be after check-in",
                    })}
                  />
                </div>

                <Input
                  label="Billing Address"
                  type="text"
                  icon={<FiMapPin />}
                  placeholder="123 Main St, City, State"
                  error={errors.billingAddress?.message}
                  {...register("billingAddress", {
                    required: "Billing address is required",
                    minLength: {
                      value: 10,
                      message: "Please enter a complete address",
                    },
                  })}
                />

                <Input
                  label="Cell Phone"
                  type="tel"
                  icon={<FiPhone />}
                  placeholder="9876543210"
                  error={errors.cellPhone?.message}
                  {...register("cellPhone", {
                    required: "Cell phone is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit Indian mobile number",
                    },
                  })}
                />

                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting || nights === 0}
                  className="mt-2"
                >
                  {isSubmitting
                    ? "Confirming Booking…"
                    : `Confirm Booking${nights > 0 ? ` · ${formatCurrency(camp.pricePerNight * nights)}` : ""}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Camp Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
              {camp.imageUrl && (
                <img
                  src={getImageUrl(camp.imageUrl)}
                  alt={camp.name}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-slate-900">
                  {camp.name}
                </h3>
                <p className="mb-4 text-sm text-slate-500 line-clamp-2">
                  {camp.description}
                </p>

                <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                  <FiUsers className="text-emerald-500" />
                  <span>Up to {camp.capacity} guests</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>
                      {formatCurrency(camp.pricePerNight)} × {nights || 0} night
                      {nights !== 1 ? "s" : ""}
                    </span>
                    <span>
                      {formatCurrency((camp.pricePerNight || 0) * nights)}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-emerald-700">
                      {formatCurrency((camp.pricePerNight || 0) * nights)}
                    </span>
                  </div>
                </div>

                {checkIn && checkOut && nights > 0 && (
                  <div className="mt-4 text-xs text-slate-400">
                    {formatDate(checkIn)} → {formatDate(checkOut)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
