import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import { Typography, FormControl, Button, Grid, Paper, CircularProgress, Snackbar, Alert, MenuItem } from '@mui/material';
import {phoneNumberValidationSchema, fullnameValidationSchema, genderValidationSchema, ageValidationSchema, addressValidationSchema   } from '../../utils/ValidationSchemas';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import { apiUpdatePatientProfile } from '../../services/api.service';

const ValidatorSchema = YupObject().shape({
  fullname: fullnameValidationSchema,
  age: ageValidationSchema,
  gender: genderValidationSchema,
  phone_number: phoneNumberValidationSchema,
  address: addressValidationSchema
});


export default function UpdatePatientProfileForm ({user}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userId = user.id;
      await apiUpdatePatientProfile(values, userId);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("UpdatePatientProfile Error: ", error);
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
          Update Patient Information
        </Typography>
        <Formik
          initialValues={{ fullname: '', age: '', gender: '', phone_number: '', address: '' }}
          validationSchema={ValidatorSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.fullname && Boolean(errors.fullname)}>
                    <Field
                      component={FormikTextField}
                      name="fullname"
                      label="Fullname"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.age && Boolean(errors.age)}>
                    <Field
                      component={FormikTextField}
                      name="age"
                      label="Age"
                      type="number"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.gender && Boolean(errors.gender)}>
                    <Field
                      component={FormikSelect}
                      name="gender"
                      label="Gender"
                      fullWidth
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.phone_number && Boolean(errors.phone_number)}>
                    <Field
                      component={FormikTextField}
                      name="phone_number"
                      label="Phone Number"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={touched.address && Boolean(errors.address)}>
                    <Field
                      component={FormikTextField}
                      name="address"
                      label="Address"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Button variant="contained" color="primary" disabled={loading} type='submit'>
                      Update Profile
                    </Button>
                  )}
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Profile updated successfully!
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