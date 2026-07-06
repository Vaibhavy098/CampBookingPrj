import { useEffect, useState } from "react";
import { FiCalendar, FiSearch, FiUsers } from "react-icons/fi";

import Button from "../common/Button";
import Input from "../common/Input";

function SearchForm({ onSearch }) {
  const [filters, setFilters] = useState({
    CheckInDate: "",
    CheckOutDate: "",
    Capacity: "",
    PageNumber: 1,
    PageSize: 8,
  });

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setFilters((prev) => ({
      ...prev,
      CheckInDate: today.toISOString().split("T")[0],
      CheckOutDate: tomorrow.toISOString().split("T")[0],
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ...filters, PageNumber: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-4">
      <Input
        label="Check In"
        type="date"
        name="CheckInDate"
        value={filters.CheckInDate}
        onChange={handleChange}
        icon={<FiCalendar />}
        min={new Date().toISOString().split("T")[0]}
      />

      <Input
        label="Check Out"
        type="date"
        name="CheckOutDate"
        value={filters.CheckOutDate}
        onChange={handleChange}
        icon={<FiCalendar />}
        min={filters.CheckInDate || new Date().toISOString().split("T")[0]}
      />

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Guests
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <FiUsers />
          </span>
          <select
            name="Capacity"
            value={filters.Capacity}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-700 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Any</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="4">4 Guests</option>
            <option value="6">6 Guests</option>
            <option value="8">8+ Guests</option>
          </select>
        </div>
      </div>

      <div className="flex items-end">
        <Button type="submit" fullWidth>
          <FiSearch className="mr-2" />
          Search Camps
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;
