import { useState } from 'react';
import { Button, Grid, CircularProgress, Snackbar, Alert, FormControl, Paper, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField as FormikTextField } from 'formik-mui';
import { apiResetPassword } from '../../services/api.service';
import { passwordValidationSchema } from '../../utils/ValidationSchemas';

const ValidatorSchema = Yup.object().shape({
  currentPassword:  passwordValidationSchema,
  newPassword:  passwordValidationSchema,
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  .required('Confirm password is required'),
});

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await apiResetPassword(values);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("ResetPassword Error: ", error);
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
          Reset Password
        </Typography>
        <Formik
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          validationSchema={ValidatorSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.currentPassword && Boolean(errors.currentPassword)}>
                    <Field
                      component={FormikTextField}
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.newPassword && Boolean(errors.newPassword)}>
                    <Field
                      component={FormikTextField}
                      name="newPassword"
                      label="New Password"
                      type="password"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.confirmPassword && Boolean(errors.confirmPassword)}>
                    <Field
                      component={FormikTextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Button variant="contained" color="primary" disabled={loading} type='submit'>
                      Reset Password
                    </Button>
                  )}
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Password reset successfully!
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
};

export default ResetPasswordForm;