import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginUser(data);

      localStorage.setItem("token", response.data.token);

      toast.success("Welcome back! You’re signed in.");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "Invalid email or password. Please try again.";
      toast.error(errorMessage);
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 1.5 }}
          >
            Scheduler Pro
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your availability and share booking links
            effortlessly.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.2 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?
          </Typography>
          <Button
            component={Link}
            to="/register"
            fullWidth
            variant="text"
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
