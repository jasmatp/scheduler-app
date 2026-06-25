import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingCalendar from "../components/booking/BookingCalendar";
import SlotSelector from "../components/booking/SlotSelector";
import BookingAction from "../components/booking/BookingAction";

import { bookSlot, getAvailabilityByLink } from "../api/bookingApi";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import NotFoundPage from "../components/common/NotFoundPage";

const BookingPage = () => {
  const { bookingLinkId } = useParams();

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSlot, setSelectedSlot] = useState("");

  const [availability, setAvailability] = useState<any[]>([]);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (bookingLinkId) {
      fetchAvailability();
    }
  }, [bookingLinkId]);

  const fetchAvailability = async () => {
    try {
      const response = await getAvailabilityByLink(bookingLinkId!);

      setAvailability(response.data.availability);
    } catch {
      setNotFound(true);
    }
  };

  // Flatten all available slots for the selected day and remove duplicates.
  const slots = [
    ...new Set(
      availability
        .filter((item) => item.date === selectedDate)
        .flatMap((item) => item.availableSlots || []),
    ),
  ];

  const handleBook = async () => {
    try {
      await bookSlot({
        bookingLinkId: bookingLinkId!,
        date: selectedDate,
        startTime: selectedSlot,
        endTime: add30Minutes(selectedSlot),
        bookedBy: "Guest",
      });

      toast.success("Your slot has been booked successfully.");
      setSelectedSlot("");
      await fetchAvailability();
    } catch (error) {
      toast.error("We could not confirm that booking. Please try again.");
      console.error(error);
    }
  };

  const add30Minutes = (time: string) => {
    // Bookings use a 30-minute window, which is reflected in the end time.
    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes + 30);

    return date.toTimeString().slice(0, 5);
  };

  if (notFound) {
    return <NotFoundPage />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 640,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: 1.4 }}
            >
              Book a session
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Choose a time that works for you
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Pick a date and one of the available time slots below to reserve
              your meeting.
            </Typography>
          </Box>

          <BookingCalendar date={selectedDate} setDate={setSelectedDate} />

          <SlotSelector
            slots={slots}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
          />

          <BookingAction disabled={!selectedSlot} onBook={handleBook} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default BookingPage;
