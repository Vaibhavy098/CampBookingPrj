import api from "./api";

const bookingService = {
  create: async (data) => {
    const response = await api.post("/Booking", data);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await api.get("/Booking/my-bookings");
    return response.data;
  },

  getByReference: async (reference) => {
    const response = await api.get(`/Booking/reference/${reference}`);
    return response.data;
  },

  cancel: async (id) => {
    await api.put(`/Booking/${id}/cancel`);
  },
};

export default bookingService;
