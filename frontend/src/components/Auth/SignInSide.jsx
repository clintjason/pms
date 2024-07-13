import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Avatar, Typography, FormHelperText, FormControl, FormControlLabel, Checkbox, Button, Grid, Box, Paper, Link, CircularProgress, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import sideImg from '../../assets/pixlr-image-generator-cbe82a4b-0f58-4f73-8391-6048e2faf68a.png';
import {passwordValidationSchema, emailValidationSchema   } from '../../utils/ValidationSchemas';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import { apiLogin } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginReducer } from '../../reducers/authSlice'; 

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © PMS '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignInSchema = YupObject().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

export default function SignInSide() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let data = await apiLogin(values);
      setLoading(false);
      setOpen(true);
      
      if (values.rememberMe) {
        localStorage.setItem('user_pms', JSON.stringify(data));
      } else {
        sessionStorage.setItem('user_pms', JSON.stringify(data));
      }
      dispatch(loginReducer(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error("Signin Error: ", error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${sideImg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
              Sign in
            </Typography>
            <Formik
              initialValues={{ username: '', email: '', password: '', role: '', terms_and_conditions: false }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="email"
                      type="email"
                      label="Email Address"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="password"
                      type="password"
                      label="Password"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl error={touched.rememberMe && Boolean(errors.rememberMe)}>
                      <Field name="rememberMe">
                        {({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} color="primary" />}
                            label="Remember me"
                          />
                        )}
                      </Field>
                      {touched.rememberMe && errors.rememberMe && (
                        <FormHelperText>{errors.rememberMe}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                {loading ?
                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircularProgress size={24} />
                  </Box>
                : 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign in
                </Button>
                }
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Login successfull
                  </Alert>
                </Snackbar>
                {error && (
                  <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>
                )}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Form>
            )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}