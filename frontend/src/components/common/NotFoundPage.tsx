import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" color="error">
        404
      </Typography>

      <Typography variant="h5">Page Not Found</Typography>

      <Typography color="text.secondary">
        The page you are looking for does not exist.
      </Typography>

      <Button component={Link} to="/" variant="contained">
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
