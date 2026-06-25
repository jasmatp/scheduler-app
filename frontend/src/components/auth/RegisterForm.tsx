import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register, handleSubmit } =
    useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        {...register("name")}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        {...register("password")}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;