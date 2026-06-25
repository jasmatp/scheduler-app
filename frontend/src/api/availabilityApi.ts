import api from "./axios";

export const createAvailability = (data: {
  date: string;
  startTime: string;
  endTime: string;
}) => api.post("/availability", data);
