import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

interface Props {
  date: string;
  startTime: string;
  endTime: string;

  setDate: (v: string) => void;
  setStartTime: (v: string) => void;
  setEndTime: (v: string) => void;

  onSave: () => void;
}

const AvailabilityForm = ({
  date,
  startTime,
  endTime,
  setDate,
  setStartTime,
  setEndTime,
  onSave,
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Add your availability
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Choose a date and time range that clients can book.
      </Typography>

      <Stack spacing={2}>
        {/* These inputs collect the date and time range for a new availability block. */}
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {
              min: new Date().toISOString().split("T")[0],
            },
          }}
        />

        <TextField
          label="Start time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          label="End time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <Button
          variant="contained"
          onClick={onSave}
          fullWidth
          sx={{ py: 1.2 }}
          disabled={!date || !startTime || !endTime}
        >
          Save availability
        </Button>
      </Stack>
    </Paper>
  );
};

export default AvailabilityForm;
