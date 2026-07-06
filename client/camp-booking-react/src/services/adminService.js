import api from "./api";

const adminService = {
  getAllCamps: async () => {
    const response = await api.get("/Camp");
    return response.data;
  },

  createCamp: async (data) => {
    const response = await api.post("/Camp", data);
    return response.data;
  },

  updateCamp: async (id, data) => {
    await api.put(`/Camp/${id}`, data);
  },

  deleteCamp: async (id) => {
    await api.delete(`/Camp/${id}`);
  },

  getAllBookings: async () => {
    const response = await api.get("/Booking");
    return response.data;
  },
};

export default adminService;
