import { Router } from "express";

import { protect } from "../middleware/auth.middleware";

import { createAvailability } from "../controllers/availability.controller";

const router = Router();

router.post("/", protect, createAvailability);

export default router;
