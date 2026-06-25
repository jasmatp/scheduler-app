import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import availabilityRoutes from "./routes/availability.routes";
import bookingRoutes from "./routes/booking.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API Running");
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/availability",
  availabilityRoutes
);

app.use(
  "/api/booking",
  bookingRoutes
);

export default app;