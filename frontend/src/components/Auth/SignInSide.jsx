import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Avatar from '@mui/material/Avatar';
import { object as YupObject} from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import sideImg from '../../assets/pixlr-image-generator-cbe82a4b-0f58-4f73-8391-6048e2faf68a.png';
import {passwordValidationSchema, emailValidationSchema   } from '../../utils/ValidationSchemas';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import FormHelperText from '@mui/material/FormHelperText';
import { apiLogin } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let data = await apiLogin(values);
      setLoading(false);
      
      if (values.rememberMe) {
        localStorage.setItem('user_pms', JSON.stringify(data));
      } else {
        sessionStorage.setItem('user_pms', JSON.stringify(data));
      }
      dispatch(loginReducer(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
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