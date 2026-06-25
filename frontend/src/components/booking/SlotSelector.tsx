import { Box, Chip, Typography } from "@mui/material";

interface Props {
  slots: string[];
  selectedSlot: string;
  onSelect: (slot: string) => void;
}

const SlotSelector = ({
  slots,
  selectedSlot,
  onSelect,
}: Props) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.2 }}>
        Available slots
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {slots.map((slot) => (
          <Chip
            key={slot}
            label={slot}
            clickable
            color={selectedSlot === slot ? "primary" : "default"}
            onClick={() => onSelect(slot)}
            sx={{ px: 0.5, py: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SlotSelector;