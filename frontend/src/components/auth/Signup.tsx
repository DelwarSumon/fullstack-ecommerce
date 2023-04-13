import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { AxiosError } from "axios";
import { BaseUser } from "../../types/user";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { createUserForm } from "../../redux/reducers/userReducer";
import { registrationSchema } from "../../validations/registrationSchema";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/reduxHook";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BaseUser>({
    resolver: yupResolver(registrationSchema),
  });

  const onsubmit: SubmitHandler<BaseUser> = async (data) => {
    await dispatch(createUserForm(data))
      .then((res) => {
        console.log(res.payload);
        if (res.payload instanceof AxiosError) {
          toast.error(res.payload.message);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="">
        <Box my={3} textAlign={"center"}>
          <Avatar sx={{ margin: "0 auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onsubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                className="form--field"
                {...register("name")}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
                className="form--field"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                {...register("password")}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="form--field"
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                {...register("re_password")}
                label="Confirm Password"
                type="password"
                className="form--field"
                error={errors.re_password ? true : false}
                helperText={errors.re_password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
              >
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  hidden
                />
              </Button>
              <FormHelperText
                sx={{ mb: 2 }}
                error={errors.avatar ? true : false}
              >
                {errors.avatar?.message}
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid>
            <Grid item>
              <Link to="/login">
                <Typography variant="subtitle2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Signup;
