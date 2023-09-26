import { React, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  // useMediaQuery,
} from "@mui/material";

import Modal from "@mui/material/Modal";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "../hooks/useScriptRef";
import AnimateButton from "../ui-component/extended/AnimateButton";

// assets
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const FirebaseLogin = ({ ...others }) => {
  // const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [email1, setemail] = useState("");
  const [password1, setpass] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const bothlogin = async (type) => {
    const url1 = "http://localhost:8000/login/both";
    let obj = {};
    obj["email"] = email1;
    obj["password"] = password1;

    obj["type"] = type;
    const { data: res } = await axios.post(url1, obj);
    console.log('res',res)
    if (res.message === "logged in successfully") {
      if (res.data.type === "Analyst") {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data["email"]);
        localStorage.setItem("type", res.data["type"]);
        window.location.href = "/analystdash";
      } else if (res.data.type === "Manager") {
        window.location.href = "/managerdash";
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data["email"]);
        localStorage.setItem("type", res.data["type"]);
      }
    } else {
      handleClickOpen();
    }
    console.log("res", res);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={14}
          container
          alignItems="center"
          justifyContent="center"
        ></Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const url = "http://localhost:8000/login";
            let obj = {};
            obj["email"] = values["email"];
            obj["password"] = values["password"];
            const { data: res } = await axios.post(url, obj);
            console.log("res", res);
            if (res.message === "logged in successfully") {
              if (res.data.type === "user") {
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("email", res.data["email"]);
                localStorage.setItem("type", res.data["type"]);
                window.location.href = "/user";
              } else if (res.data.type === "admin") {
                window.location.href = "/admin";
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("email", res.data["email"]);
                localStorage.setItem("type", res.data["type"]);
              }
            } else if (res.message === "Analyst+Manager") {
              setemail(values["email"]);
              setpass(values["password"]);
              handleOpen();
            } else {
              handleClickOpen();
            }
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              style={{backgroundColor:"#ffff"}}
              variant="standard"
              // sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}

              // sx={{ ...theme.typography.customInput }}
              style={{ marginTop: "1rem", backgroundColor:"#ffff" }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
              style={{ color:"#ffff"}}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link to="/forgotEmail">
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ textDecoration: "none", cursor: "pointer", color:"#ffff" }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Welcome,
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  variant="h4"
                  component="h2"
                >
                  How would you like to sign in?
                </Typography>
                <Grid container spacing={2} style={{ marginTop: "1em" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        // settype("Analyst");
                        bothlogin("Analyst");
                      }}
                    >
                      Analyst
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        // settype();
                        bothlogin("Manager");
                      }}
                    >
                      Manager
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{backgroundColor:"#49A7DC"}}
                  // onClick={handleOpen}
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Invalid Login"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid Email or Password. Kindly check your credentials again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FirebaseLogin;
