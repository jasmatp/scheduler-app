import { Request, Response } from "express";

import crypto from "crypto";

import User from "../models/User";
import Availability from "../models/Availability";
import Booking from "../models/Booking";
import { generateSlots } from "../utils/slotGenerator";

export const generateBookingLink = async (req: any, res: Response) => {
  try {
    const bookingLinkId = crypto.randomUUID();

    await User.findByIdAndUpdate(req.user.userId, {
      bookingLinkId,
    });

    res.json({
      bookingLinkId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAvailabilityByLink = async (req: Request, res: Response) => {
  try {
    const { bookingLinkId } = req.params;

    const user = await User.findOne({
      bookingLinkId,
    });

    if (!user) {
      return res.status(404).json({
        message: "Booking link not found",
      });
    }

    const availabilities = await Availability.find({
      userId: user._id,
    });

    const bookings = await Booking.find({
      bookingLinkId,
    });

    const result = availabilities.map((availability) => {
      const allSlots = generateSlots(
        availability.startTime,
        availability.endTime,
      );

      const bookedSlots = bookings
        .filter((booking) => booking.date === availability.date)
        .map((booking) => booking.startTime);

      return {
        date: availability.date,
        availableSlots: allSlots.filter((slot) => !bookedSlots.includes(slot)),
      };
    });

    res.json({
      availability: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const bookSlot = async (req: Request, res: Response) => {
  try {
    const { bookingLinkId, date, startTime, endTime, bookedBy } = req.body;

    if (!bookingLinkId || !date || !startTime || !bookedBy) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingBooking = await Booking.findOne({
      bookingLinkId,
      date,
      startTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    const booking = await Booking.create({
      bookingLinkId,
      date,
      startTime,
      endTime,
      bookedBy,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
