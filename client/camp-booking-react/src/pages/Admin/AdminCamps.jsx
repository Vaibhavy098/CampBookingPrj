import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { formatCurrency, getImageUrl } from "../../utils/formatters";

function CampFormModal({ initial, onClose, onSaved }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: initial || {} });

  const onSubmit = async (data) => {
    const payload = {
      Name: data.name,
      Description: data.description,
      PricePerNight: Number(data.pricePerNight),
      Capacity: Number(data.capacity),
      ImageUrl: data.imageUrl,
    };
    try {
      if (initial) {
        await adminService.updateCamp(initial.id, payload);
        toast.success("Camp updated.");
      } else {
        await adminService.createCamp(payload);
        toast.success("Camp created.");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.response?.data?.title ||
          "Operation failed.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {initial ? "Edit Camp" : "Add New Camp"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Camp Name"
            placeholder="e.g. Mountain Retreat"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe the camp experience…"
              className={`w-full resize-none rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 ${
                errors.description ? "border-red-400" : "border-slate-300"
              }`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price Per Night (₹)"
              type="number"
              min="1"
              icon={<FiDollarSign />}
              placeholder="1500"
              error={errors.pricePerNight?.message}
              {...register("pricePerNight", {
                required: "Price is required",
                min: { value: 1, message: "Must be at least ₹1" },
              })}
            />
            <Input
              label="Capacity (guests)"
              type="number"
              min="1"
              icon={<FiUsers />}
              placeholder="4"
              error={errors.capacity?.message}
              {...register("capacity", {
                required: "Capacity is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
            />
          </div>

          <Input
            label="Image URL"
            type="url"
            placeholder="https://images.unsplash.com/…"
            error={errors.imageUrl?.message}
            {...register("imageUrl", { required: "Image URL is required" })}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Create Camp"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminCamps() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCamp, setModalCamp] = useState(undefined);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchCamps = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllCamps();
      setCamps(Array.isArray(data) ? data : (data?.items ?? []));
    } catch {
      toast.error("Failed to load camps.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCamps();
  }, [fetchCamps]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await adminService.deleteCamp(id);
      toast.success("Camp deleted.");
      setConfirmDelete(null);
      fetchCamps();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Manage Camps
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {camps.length} camp{camps.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Button onClick={() => setModalCamp(null)}>
          <FiPlus className="mr-2" />
          Add Camp
        </Button>
      </div>

      {loading ? (
        <Loader size="lg" className="py-20" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {camps.map((camp) => (
            <div
              key={camp.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="relative h-40 overflow-hidden bg-slate-100">
                {camp.imageUrl ? (
                  <img
                    src={getImageUrl(camp.imageUrl)}
                    alt={camp.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-teal-200" />
                )}
              </div>
              <div className="p-5">
                <h3 className="mb-1 font-bold text-slate-900">{camp.name}</h3>
                <p className="mb-3 text-xs text-slate-500 line-clamp-2">
                  {camp.description}
                </p>
                <div className="mb-4 flex gap-4 text-xs text-slate-500">
                  <span>{formatCurrency(camp.pricePerNight)}/night</span>
                  <span>·</span>
                  <span>{camp.capacity} guests</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 text-xs"
                    onClick={() => setModalCamp(camp)}
                  >
                    <FiEdit2 className="mr-1.5" size={13} />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1 text-xs"
                    onClick={() => setConfirmDelete(camp)}
                    disabled={deletingId === camp.id}
                  >
                    <FiTrash2 className="mr-1.5" size={13} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalCamp !== undefined && (
        <CampFormModal
          initial={modalCamp}
          onClose={() => setModalCamp(undefined)}
          onSaved={fetchCamps}
        />
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              Delete Camp?
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              <strong>{confirmDelete.name}</strong> will be permanently removed.
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth
                disabled={deletingId === confirmDelete.id}
                onClick={() => handleDelete(confirmDelete.id)}
              >
                {deletingId === confirmDelete.id ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCamps;
