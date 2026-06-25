import { Button } from "@mui/material";

interface Props {
  disabled: boolean;
  onBook: () => void;
}

const BookingAction = ({
  disabled,
  onBook,
}: Props) => {
  return (
    <Button variant="contained" disabled={disabled} onClick={onBook} sx={{ py: 1.2, px: 3, alignSelf: "flex-start" }}>
      Book selected slot
    </Button>
  );
};

export default BookingAction;