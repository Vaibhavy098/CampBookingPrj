import { FiSearch } from "react-icons/fi";
import CampCard from "./CampCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import Pagination from "../common/Pagination";

function CampGrid({ camps, loading, totalPages, currentPage, onPageChange }) {
  if (loading) {
    return <Loader size="lg" className="py-20" />;
  }

  if (!camps || camps.length === 0) {
    return (
      <EmptyState
        icon={<FiSearch />}
        title="No camps found"
        description="Try adjusting your search filters or check back later for new listings."
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {camps.map((camp) => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default CampGrid;
