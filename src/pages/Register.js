import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import { Link, useNavigate } from "react-router-dom";

import CITEDU from "../assets/imgs/CIT Education.png";
import LogoCIT from "../assets/imgs/Logo.jpg";

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Copyright from "../common/Copyright";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const validationScheme = yup.object().shape({
    firstName: yup.string().min(2).max(7).required(),
    lastName: yup.string().min(2).max(7).required(),
    email: yup.string().email().required(),
    password: yup.string().min(2).max(20).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(validationScheme) });

  console.log(errors);
  const handleData = (data) => {
    console.log(data);
    localStorage.setItem("register", JSON.stringify(data));
    toast.success("Sign up success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/login");
    }, 6000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box
            component="img"
            sx={{
              height: "100vh",
              width: "50%",
            }}
            alt="CITEDU"
            src={CITEDU}
          />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 150,
                  marginBottom: "50px",
                }}
                alt="LogoCIT"
                src={LogoCIT}
              />
              <Typography component="h1" variant="h5">
                Sign up CIT Education
              </Typography>
              <Box
                component="form"
                sx={{ mt: 3 }}
                onSubmit={handleSubmit(handleData)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      {...register("firstName")}
                    />
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "15px",
                        marginTop: "10px",
                      }}>
                      {errors?.firstName?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      {...register("lastName")}
                    />
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "15px",
                        marginTop: "10px",
                      }}>
                      {errors?.lastName?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      {...register("email")}
                    />
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "15px",
                        marginTop: "10px",
                      }}>
                      {errors?.email?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      {...register("password")}
                    />
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "15px",
                        marginTop: "10px",
                      }}>
                      {errors?.password?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Agree with CIT Education's terms and conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
        </Box>
      )}
    </>
  );
}

export default Register;
