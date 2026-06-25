import api from "./axios";

export const generateBookingLink = () => api.post("/booking/generate-link");

export const getAvailabilityByLink = (bookingLinkId: string) =>
  api.get(`/booking/${bookingLinkId}`);

export const bookSlot = (data: any) => api.post("/booking/book", data);
