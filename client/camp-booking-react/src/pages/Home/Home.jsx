import { useState } from "react";
import toast from "react-hot-toast";
import HeroSection from "./sections/HeroSection";
import FeaturedCampSection from "./sections/FeaturedCampSection";
import StatisticsSection from "./sections/StatisticsSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import CampGrid from "../../components/camp/CampGrid";
import campService from "../../services/campService";

function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMeta, setSearchMeta] = useState({
    page: 1,
    totalPages: 1,
    filters: null,
  });

  const runSearch = async (filters, pageNumber = 1) => {
    setSearchLoading(true);
    try {
      const data = await campService.search({
        ...filters,
        PageNumber: pageNumber,
      });
      setSearchResults(data.items ?? []);
      setSearchMeta({
        page: pageNumber,
        totalPages: data.totalPages ?? 1,
        filters,
      });
    } catch {
      toast.error("Search failed. Please try again.");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = (filters) => {
    runSearch(filters, 1);
    setTimeout(() => {
      document
        .getElementById("search-results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSearchPageChange = (page) => {
    runSearch(searchMeta.filters, page);
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />

      {searchResults !== null && (
        <section id="search-results" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Search Results
              </h2>
              <p className="mt-1 text-slate-500">
                {searchResults.length === 0
                  ? "No camps matched your criteria."
                  : `Showing ${searchResults.length} camp${searchResults.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <CampGrid
              camps={searchResults}
              loading={searchLoading}
              totalPages={searchMeta.totalPages}
              currentPage={searchMeta.page}
              onPageChange={handleSearchPageChange}
            />
          </div>
        </section>
      )}

      <FeaturedCampSection />
      <StatisticsSection />
      <WhyChooseUsSection />
    </>
  );
}

export default Home;
