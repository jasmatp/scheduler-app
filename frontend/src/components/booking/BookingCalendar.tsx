import { Paper, TextField } from "@mui/material";

interface Props {
  date: string;
  setDate: (v: string) => void;
}

const BookingCalendar = ({ date, setDate }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <TextField
        label="Select date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: {
            min: new Date().toISOString().split("T")[0],
          },
        }}
      />
    </Paper>
  );
};

export default BookingCalendar;
