import {useContext} from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {  toast } from 'react-toastify';
import {Link,useNavigate} from 'react-router-dom'
import ShowsContext from "../../context/shows/showsContext";

const schema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupPage = () => {
  const {  allUsers } = useContext(ShowsContext);

    const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    const isEmailAlreadyExists = allUsers.some(user => user.email === data.email);
  
    if (isEmailAlreadyExists) {
        
      return toast.error("User is already exist.!");
    }
  
    const userId = new Date().getTime();
  
   
    const newUser = {
      id: userId,
      name: data.name,
      email: data.email,
      password: data.password,
    };
  
    allUsers.push(newUser);
  
    // Update the users array in localStorage
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    toast.success("User register successfully!")

    navigate("/login");

  
    
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
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
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button fullWidth variant="contained" style={{ margin: "8px 0" }} color="primary" type="submit">
          Sign Up
        </Button>
        <Typography align="center">
          You have account?{" "}
          <Link  to="/login">
            Sign In
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default SignupPage;
