export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface Availability {
  date: string;
  startTime: string;
  endTime: string;
}