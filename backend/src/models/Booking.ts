import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    bookingLinkId: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    bookedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index(
  {
    bookingLinkId: 1,
    date: 1,
    startTime: 1,
  },
  {
    unique: true,
  },
);

export default model("Booking", bookingSchema);
