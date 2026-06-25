import { Router } from "express";

import { protect } from "../middleware/auth.middleware";

import {
  generateBookingLink,
  getAvailabilityByLink,
  bookSlot,
} from "../controllers/booking.controller";

const router = Router();

router.post("/generate-link", protect, generateBookingLink);

router.get("/:bookingLinkId", getAvailabilityByLink);

router.post("/book", bookSlot);

export default router;
