import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import {
  formatDate,
  formatCurrency,
  getBookingStatusLabel,
  getBookingStatusColor,
} from "../../utils/formatters";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "1", label: "Pending" },
  { value: "2", label: "Confirmed" },
  { value: "3", label: "Cancelled" },
  { value: "4", label: "Completed" },
];

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminService
      .getAllBookings()
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    const matchStatus =
      statusFilter === "" || String(b.status) === statusFilter;
    const matchSearch =
      search === "" ||
      b.campName?.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingReference?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">All Bookings</h1>
        <p className="mt-1 text-sm text-slate-500">
          {bookings.length} total booking{bookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by camp or reference…"
          className="flex-1 min-w-48 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
        />
        <div className="flex gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                statusFilter === f.value
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader size="lg" className="py-20" />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FiCalendar />}
          title="No bookings found"
          description="Try adjusting the filters."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Reference",
                    "Camp",
                    "Check In",
                    "Check Out",
                    "Total",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="transition hover:bg-slate-50">
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-slate-500">
                      {b.bookingReference}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {b.campName}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {formatDate(b.checkInDate)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {formatDate(b.checkOutDate)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                      {formatCurrency(b.totalAmount)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getBookingStatusColor(b.status)}`}
                      >
                        {getBookingStatusLabel(b.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
