import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import { Typography, FormControl, Button, Grid, Paper, CircularProgress, Snackbar, Alert } from '@mui/material';
import { emailValidationSchema, usernameValidationSchema  } from '../../utils/ValidationSchemas';
import { TextField as FormikTextField} from 'formik-mui';
import { apiUpdateUser } from '../../services/api.service';

const ValidatorSchema = YupObject().shape({
  email: emailValidationSchema,
  username: usernameValidationSchema
});

export default function UpdateUserForm ({user}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {...values, userId: user.id}
      console.log(payload);
      await apiUpdateUser(values, user.id);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("apiUpdateUser Error: ", error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{mb:2}}>
          Update Username/Email
        </Typography>
        <Formik
          initialValues={{ email: '', username: '' }}
          validationSchema={ValidatorSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.email && Boolean(errors.email)}>
                    <Field
                      component={FormikTextField}
                      name="email"
                      label="Email"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.username && Boolean(errors.username)}>
                    <Field
                      component={FormikTextField}
                      name="username"
                      label="Username"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Button variant="contained" color="primary" disabled={loading} type='submit'>
                      Update
                    </Button>
                  )}
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Email/Username updated successfully!
                  </Alert>
                </Snackbar>
                {error && (
                  <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}