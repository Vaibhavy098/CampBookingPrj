import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FiGrid, FiMap, FiCalendar, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/camps", label: "Manage Camps", icon: FiMap },
  { to: "/admin/bookings", label: "All Bookings", icon: FiCalendar },
];

function AdminPage() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="p-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Admin Panel
          </p>
          <h2 className="text-lg font-bold text-slate-900">CampBooking</h2>
        </div>
        <nav className="px-3 pb-6">
          {sidebarLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <div className="my-3 border-t border-slate-100" />
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FiArrowLeft size={16} />
            Back to Site
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Top Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-200 bg-white lg:hidden">
        {sidebarLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                isActive ? "text-emerald-600" : "text-slate-500"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 lg:p-8 lg:pb-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
