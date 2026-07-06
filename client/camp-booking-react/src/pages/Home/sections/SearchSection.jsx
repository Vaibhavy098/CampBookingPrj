import SearchForm from "../../../components/camp/SearchForm";

function SearchSection({ onSearch }) {
  return (
    <section id="search-section" className="relative z-20 -mt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white px-8 py-8 shadow-2xl ring-1 ring-slate-100/50 sm:px-10 sm:py-9">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Find Your Camp
          </h2>
          <SearchForm onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
