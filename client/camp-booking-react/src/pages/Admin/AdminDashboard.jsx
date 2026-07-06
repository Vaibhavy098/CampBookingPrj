import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMap, FiCalendar, FiArrowRight } from "react-icons/fi";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";
import {
  getBookingStatusLabel,
  getBookingStatusColor,
} from "../../utils/formatters";

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function AdminDashboard() {
  const [camps, setCamps] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminService.getAllCamps(), adminService.getAllBookings()])
      .then(([c, b]) => {
        setCamps(Array.isArray(c) ? c : (c?.items ?? []));
        setBookings(Array.isArray(b) ? b : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const bookingsByStatus = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const totalBookings = bookings.length;

  const activeBookings =
    totalBookings - (bookingsByStatus[3] || 0) - (bookingsByStatus[4] || 0);
  if (loading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your platform activity
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiMap}
          label="Total Camps"
          value={camps.length}
          color="bg-emerald-500"
        />
        <StatCard
          icon={FiCalendar}
          label="Total Bookings"
          value={bookings.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={FiCalendar}
          label="Active Bookings"
          value={activeBookings}
          color="bg-amber-500"
        />
        <StatCard
          icon={FiCalendar}
          label="Completed"
          value={bookingsByStatus[4] || 0}
          color="bg-slate-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Recent Bookings</h2>
            <Link
              to="/admin/bookings"
              className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800">{b.campName}</p>
                  <p className="text-xs text-slate-400 font-mono">
                    {b.bookingReference}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBookingStatusColor(b.status)}`}
                >
                  {getBookingStatusLabel(b.status)}
                </span>
              </div>
            ))}
            {bookings.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-400">
                No bookings yet
              </p>
            )}
          </div>
        </div>

        {/* Camps Overview */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Camps</h2>
            <Link
              to="/admin/camps"
              className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Manage <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {camps.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-400">
                    Capacity: {c.capacity} · ₹{c.pricePerNight}/night
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  ⭐{" "}
                  {c.averageRating > 0
                    ? `${c.averageRating.toFixed(1)} (${c.totalRatings})`
                    : "No Ratings"}
                </span>
              </div>
            ))}
            {camps.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-400">
                No camps yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
