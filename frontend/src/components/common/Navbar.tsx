import { AppBar, Box, Button, Chip, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You’ve been signed out.");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)" }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Scheduler Pro
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Elegant booking for modern teams
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip label="Dashboard" size="small" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;