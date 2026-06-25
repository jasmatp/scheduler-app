import { Request, Response } from "express";

import Availability from "../models/Availability";

export const createAvailability = async (req: any, res: Response) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Date, start time and end time are required",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "End time must be after start time",
      });
    }

    const availability = await Availability.create({
      userId: req.user.userId,
      date,
      startTime,
      endTime,
    });

    res.status(201).json(availability);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
