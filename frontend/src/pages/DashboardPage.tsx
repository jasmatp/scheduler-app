import { useState } from "react";

import AvailabilityForm from "../components/availability/AvailabilityForm";
import AvailabilityList from "../components/availability/AvailabilityList";
import GenerateLinkCard from "../components/availability/GenerateLinkCard";
import { createAvailability } from "../api/availabilityApi";
import { generateBookingLink } from "../api/bookingApi";
import { Box, Container, Stack, Typography } from "@mui/material";
import Navbar from "../components/common/Navbar";
import { toast } from "react-toastify";
import type { Availability } from "../types/auth";

const DashboardPage = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [bookingLink, setBookingLink] = useState("");

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const handleSave = async () => {
    // Prevent saving incomplete availability before the user has chosen a full slot.
    if (!date || !startTime || !endTime) {
      toast.error("Please fill in the date and time range before saving.");
      return;
    }

    try {
      const response = await createAvailability({
        date,
        startTime,
        endTime,
      });

      setAvailabilities((prev) => [...prev, response.data]);
      toast.success("Availability saved successfully.");
    } catch (error) {
      toast.error("We could not save that availability. Please try again.");
      console.error(error);
    }
  };

  const handleGenerateLink = async () => {
    // Create a shareable booking page that clients can use to reserve a slot.
    try {
      const response = await generateBookingLink();

      setBookingLink(`${window.location.origin}/book/${response.data.bookingLinkId}`);
      toast.success("Booking link generated and ready to share.");
    } catch (error) {
      toast.error("Unable to generate a booking link right now.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 1.4 }}>
            Scheduler Pro
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Organize your booking flow with elegance
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Add availability, create a booking link, and keep your scheduling experience simple for every client.
          </Typography>
        </Box>

        <Stack spacing={3}>
          <AvailabilityForm
            date={date}
            startTime={startTime}
            endTime={endTime}
            setDate={setDate}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            onSave={handleSave}
          />

          <AvailabilityList data={availabilities} />

          <GenerateLinkCard bookingLink={bookingLink} onGenerate={handleGenerateLink} />
        </Stack>
      </Container>
    </>
  );
};

export default DashboardPage;
