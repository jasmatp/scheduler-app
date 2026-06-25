import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } =
    useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        {...register("password")}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;