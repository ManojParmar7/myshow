/*eslint-disable */
import React, {useState,useContext } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {  toast } from 'react-toastify';
import {  useNavigate,Link } from "react-router-dom";
import ShowsContext from "../../context/shows/showsContext";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SigninPage = () => {
  const {  allUsers,  login,  } = useContext(ShowsContext);

    const navigate = useNavigate();

  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const user = allUsers.find((user) => user.email === data.email);

    if (user) {
      if (user.password === data.password) {
        toast.success("Login successful!");
        navigate("/");
        
        // Use the login action to update the auth state
        login(user);

        localStorage.setItem('auth', JSON.stringify(user));
      } else {
        toast.error("Incorrect Password!");
      }
    } else {
      toast.error("No users found. Please sign up!");
    }
  };

  // ... existing code ...
  

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        {error && (
          <Typography
            color="error"
            variant="subtitle2"
            align="center"
            style={{ margin: "8px 0" }}
          >
            {error}
          </Typography>
        )}
        <Button fullWidth variant="contained"            style={{ margin: "8px 0" }}
  color="primary" type="submit">
          Sign In
        </Button>
        <Typography align="center">
          Don't have an account?{" "}
          <Link  to="/register">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default SigninPage;
