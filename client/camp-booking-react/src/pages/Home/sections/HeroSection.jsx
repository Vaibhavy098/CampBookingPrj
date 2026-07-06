import heroImage from "../../../assets/images/hero.jpg";
import SearchForm from "../../../components/camp/SearchForm";

/**
 * Layout contract (zoom-independent):
 *
 *   Background layer  ─── absolute, always 72vh tall
 *   Text wrapper      ─── min-h: calc(72vh - 9rem)
 *                         At any viewport height, the card that follows
 *                         will always start exactly 9rem (144 px) before
 *                         the background ends → 80 % of the desktop card
 *                         sits inside the hero image, 20 % floats below.
 *   Search card       ─── normal-flow, follows the text wrapper
 *                         Its height is never fixed, so it adapts to
 *                         every breakpoint and zoom level automatically.
 */
function HeroSection({ onSearch }) {
  return (
    <section className="relative">
      {/* ── Background: fixed 72 vh, never affects layout flow ── */}
      <div
        className="absolute inset-x-0 top-0 h-[72vh] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-900/30" />
      </div>

      {/* ── Content column ── */}
      <div className="relative z-10">
        {/* Hero text lives inside the background area.
            min-h shrinks by exactly how much card will overlap the bg,
            so the card always starts 9 rem before the bg ends. */}
        <div className="flex min-h-[calc(72vh-9rem)] items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-emerald-600/20 px-4 py-2 text-sm font-semibold text-emerald-300">
                🌿 Experience Nature Like Never Before
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Find Your Perfect
                <span className="block text-emerald-400">
                  Camping Destination
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
                Escape the ordinary and reconnect with nature. Discover
                breathtaking camps, book instantly, and create unforgettable
                memories with family and friends.
              </p>
            </div>
          </div>
        </div>

        {/* Search card — in normal flow, no negative margins.
            Top of this card is 9 rem before the background ends,
            giving the 80/20 floating-card effect at every zoom level. */}
        <div
          id="search-section"
          className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-3xl bg-white px-8 py-8 shadow-2xl ring-1 ring-white/10 sm:px-10 sm:py-9">
            <h2 className="mb-6 text-lg font-bold text-slate-800">
              Find Your Camp
            </h2>
            <SearchForm onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
