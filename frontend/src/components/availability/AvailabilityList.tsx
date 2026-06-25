import { Box, Chip, Paper, Typography } from "@mui/material";
import type { Availability } from "../../types/auth";

interface Props {
  data: Availability[];
}

const formatDate = (value: string) => {
  const parsed = new Date(value);
  return parsed.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
};

const AvailabilityList = ({ data }: Props) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 700 }}>
        Availability overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Your saved time slots will appear here for quick review.
      </Typography>

      {data.length === 0 ? (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px dashed", borderColor: "divider", backgroundColor: "rgba(255,255,255,0.75)" }}>
          <Typography color="text.secondary">No availability added yet. Start by scheduling your first time slot.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {data.map((item, index) => (
            <Paper key={index} elevation={0} sx={{ p: 2.2, borderRadius: 2, border: "1px solid", borderColor: "divider", backgroundColor: "white" }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {formatDate(item.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perfect for client meetings and consult calls.
                  </Typography>
                </Box>
                <Chip label={`${item.startTime} - ${item.endTime}`} color="primary" variant="outlined" />
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AvailabilityList;