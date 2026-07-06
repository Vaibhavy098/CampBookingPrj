import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🏕</span>
              <span className="text-xl font-bold text-white">
                Camp<span className="text-emerald-400">Booking</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Discover breathtaking camping destinations across India. Book
              instantly and create unforgettable memories in nature.
            </p>
            <div className="mt-6 flex gap-4">
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition hover:bg-emerald-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Browse Camps", to: "/#featured" },
                { label: "Search Camps", to: "/#search" },
                { label: "My Bookings", to: "/my-bookings" },
                { label: "Sign In", to: "/login" },
                { label: "Create Account", to: "/register" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="transition hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "About Us",
                "How It Works",
                "Privacy Policy",
                "Terms of Service",
                "Cancellation Policy",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="transition hover:text-emerald-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />
                <span>Sector 62, Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={16} className="shrink-0 text-emerald-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={16} className="shrink-0 text-emerald-500" />
                <span>hello@campbooking.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} CampBooking. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with ❤️ for outdoor adventures
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
