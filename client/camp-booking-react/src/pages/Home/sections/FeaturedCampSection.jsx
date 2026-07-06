import { useState, useEffect } from "react";
import CampGrid from "../../../components/camp/CampGrid";
import campService from "../../../services/campService";

function FeaturedCampSection() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCamps = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const data = await campService.search({
        CheckInDate: new Date().toISOString().split("T")[0],
        CheckOutDate: new Date(Date.now() + 86400000)
          .toISOString()
          .split("T")[0],
        PageNumber: pageNumber,
        PageSize: 8,
      });
      setCamps(data.items ?? []);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setCamps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps(page);
  }, [page]);

  return (
    <section id="featured" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Handpicked For You
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Featured Camps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            From riverside retreats to mountain hideaways — find the perfect
            camp for your next escape.
          </p>
        </div>

        <CampGrid
          camps={camps}
          loading={loading}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}

export default FeaturedCampSection;
