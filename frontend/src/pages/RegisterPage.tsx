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
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await registerUser(data);

      toast.success("Account created! Please sign in to continue.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 8,
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
            New account
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Create your scheduler account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set up your booking workspace in a few simple steps.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, py: 1.2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?
          </Typography>

          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="text"
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
