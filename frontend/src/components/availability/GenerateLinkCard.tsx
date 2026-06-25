import { Box, Button, Chip, Paper, Typography } from "@mui/material";

interface Props {
  bookingLink: string;
  onGenerate: () => void;
}

const GenerateLinkCard = ({ bookingLink, onGenerate }: Props) => {
  return (
    <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", backgroundColor: "white" }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Share a booking link
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Generate a polished link for your clients to book available time slots.
      </Typography>

      <Button variant="outlined" onClick={onGenerate} sx={{ px: 3 }}>
        Generate booking link
      </Button>

      {bookingLink && (
        <Box sx={{ mt: 2 }}>
          <Chip label={bookingLink} color="primary" variant="outlined" sx={{ maxWidth: "100%", height: "auto", py: 1, px: 1.2 }} />
        </Box>
      )}
    </Paper>
  );
};

export default GenerateLinkCard;