import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiUsers } from "react-icons/fi";
import RatingStars from "./RatingStars";
import { formatCurrency, getImageUrl } from "../../utils/formatters";

function CampCard({ camp }) {
  const {
    id,
    name,
    pricePerNight,
    capacity,
    imageUrl,
    averageRating,
    totalRatings,
  } = camp;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-200">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {imageUrl ? (
          <LazyLoadImage
            src={getImageUrl(imageUrl)}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            wrapperClassName="h-full w-full"
            effect="opacity"
            placeholder={
              <div className="h-full w-full animate-pulse bg-gradient-to-br from-slate-200 to-slate-300" />
            }
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-teal-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-white/90 px-3 py-1 text-sm font-bold text-emerald-700 backdrop-blur-sm">
            {formatCurrency(pricePerNight)}
            <span className="font-normal text-slate-500">/night</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-base font-bold text-slate-900 line-clamp-1">
          {name}
        </h3>

        <div className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
          <FiUsers className="text-emerald-500" />
          <span>Up to {capacity} guests</span>
        </div>

        <div className="mb-5">
          <RatingStars rating={averageRating} totalRatings={totalRatings} />
        </div>

        <div className="mt-auto">
          <Link
            to={`/book/${id}`}
            className="block w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CampCard;
