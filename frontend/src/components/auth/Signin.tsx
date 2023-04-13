import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { AxiosError } from "axios";
import { Credentials } from "../../types/user";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { authenticateCredential } from "../../redux/reducers/userReducer";
import { loginSchema } from "../../validations/loginSchema";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/reduxHook";
import { yupResolver } from "@hookform/resolvers/yup";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(loginSchema),
  });

  const onsubmit: SubmitHandler<Credentials> = async (data) => {
    
    await dispatch(authenticateCredential(data))
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="">
        <Box my={3} textAlign={"center"}>
          <Avatar sx={{ margin: "0 auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container my={2}>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Signin;
