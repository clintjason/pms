import {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import sideImg from '../../assets/pixlr-image-generator-cbe82a4b-0f58-4f73-8391-6048e2faf68a.png';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import {usernameValildationSchema, passwordValidationSchema, emailValidationSchema, roleValidationSchema, termsAndConditionsValidationSchema   } from '../../utils/ValidationSchemas';
import FormHelperText from '@mui/material/FormHelperText';
import { signup } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © PMS '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUpSchema = YupObject().shape({
  username: usernameValildationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  role: roleValidationSchema,
  terms_and_conditions: termsAndConditionsValidationSchema,
});

export default function SignUpSide() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await signup(values);
      setLoading(false);
      navigate('/signin');
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
              Sign up
            </Typography>
            <Formik
              initialValues={{ username: '', email: '', password: '', role: '', terms_and_conditions: false }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="username"
                      type="username"
                      label="Username"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
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
                    <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                      {/* <InputLabel id="role-label">Role</InputLabel> */}
                      <Field
                        component={FormikSelect}
                        name="role"
                        labelId="role-label"
                        label="Role"
                        fullWidth
                      >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"patient"}>Patient</MenuItem>
                        <MenuItem value={"doctor"}>Doctor</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl error={touched.terms_and_conditions && Boolean(errors.terms_and_conditions)}>
                      <Field name="terms_and_conditions">
                        {({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} color="primary" />}
                            label={
                              <Link href="#" variant="body2">
                                {"You've read and accept our terms and conditions"}
                              </Link>
                            }
                          />
                        )}
                      </Field>
                      {touched.terms_and_conditions && errors.terms_and_conditions && (
                        <FormHelperText>{errors.terms_and_conditions}</FormHelperText>
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
                  Sign up
                </Button>
                }
                <Grid container>
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
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