import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import FormHelperText from '@mui/material/FormHelperText';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const VitalSignForm = () => {
  const [temperature, setTemperature] = useState('');
  const [temperatureType, setTemperatureType] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [heartRateType, setHeartRateType] = useState('');
  const [respirationRate, setRespirationRate] = useState('');
  const [respirationRateType, setRespirationRateType] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    axios.post('/api/vital-signs', {
      temperature,
      temperature_type: temperatureType,
      heart_rate: heartRate,
      heart_rate_type: heartRateType,
      respiration_rate: respirationRate,
      respiration_rate_type: respirationRateType
    }) // Replace with your API endpoint
      .then(response => {
        setLoading(false);
        setOpen(true);
        setTemperature('');
        setTemperatureType('');
        setHeartRate('');
        setHeartRateType('');
        setRespirationRate('');
        setRespirationRateType('');
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
        initialValues={{ temperatureType: '', }}
        //validationSchema={}
        onSubmit={handleSubmit}
      >
      {({ errors, touched }) => (
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.temperatureType && Boolean(errors.temperatureType)}>
                <Field
                  component={FormikSelect}
                  name="temperatureType"
                  labelId="temperature-TYPE-label"
                  label="Temperature Type"
                  fullWidth
                >
                  <MenuItem value={"Oral"}>Oral</MenuItem>
                  <MenuItem value={"Axillary"}>Axillary</MenuItem>
                  <MenuItem value={"Rectal"}>Rectal</MenuItem>
                  <MenuItem value={"Tympanic"}>Tympanic</MenuItem>
                  <MenuItem value={"Temporal"}>Temporal</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Simulate'}
              </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Vital sign simulated successfully!
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
  );
};

export default VitalSignForm;