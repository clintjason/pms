import React, { useState } from 'react';
import { TextField, Button, FormControl, MenuItem, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import { TextField as FormikTextField, Select as FormikSelect, Checkbox as CheckboxWithLabel} from 'formik-mui';
import { apiVitalSignSimulator } from '../../services/api.service';
import { temperatureTypeValidationSchema, symptomsValidationSchema, conditionValidationSchema, feedbackValidationSchema } from '../../utils/ValidationSchemas';

const ValidatorSchema = YupObject().shape({
  temperatureType:  temperatureTypeValidationSchema,
  symptoms: symptomsValidationSchema,
  feedback: feedbackValidationSchema,
  condition_before_taking_vital_signs: conditionValidationSchema,
});

const conditions = [
  "Resting/Sedentary",
  "Post-Exercise",
  "During Exercise",
  "Asleep",
  "Awake",
  "Stress/Anxiety",
  "Relaxed",
  "Fasted",
  "Post-Meal",
  "Dehydrated",
  "Hydrated",
];

const symptoms = [
  "Fever",
  "Shortness of breath",
  "Rapid heartbeat",
  "Dizziness",
  "Sweating",
  "Fatigue",
  "No symptoms",
];

const VitalSignForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      let data = await apiVitalSignSimulator(values);
      setLoading(false);
      setOpen(true);
      console.log("Data received: " + data)
    } catch (error) {
      console.error("VitalSignSimulator Error: ", error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Formik
        initialValues={{ temperatureType: '', symptoms:[], feedback: '', condition_before_taking_vital_signs:[] }}
        validationSchema={ValidatorSchema}
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
              <FormControl fullWidth error={touched.symptoms && Boolean(errors.symptoms)}>
                <Field
                  component={FormikSelect}
                  name="symptoms"
                  labelId="symptoms-label"
                  label="Symptoms"
                  multiple
                  fullWidth
                >
                  {symptoms.map((symptom, index) => (
                    <MenuItem key={index} value={symptom}>{symptom}</MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.condition_before_taking_vital_signs && Boolean(errors.condition_before_taking_vital_signs)}>
                <Field
                  component={FormikSelect}
                  name="condition_before_taking_vital_signs"
                  labelId="condition_before_taking_vital_signs-label"
                  label="Condition before taking your vitals"
                  multiple
                  fullWidth
                >
                  {conditions.map((condition, index) => (
                    <MenuItem key={index} value={condition}>{condition}</MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={touched.feedback && Boolean(errors.feedback)}>
                <Field
                  component={FormikTextField}
                  name="feedback"
                  labelId="feedback-label"
                  label="Feedback"
                  multiline
                  rows={4}
                  fullWidth
                >
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {loading ?
                <CircularProgress size={24} />
              :
                <Button variant="contained" color="primary" disabled={loading} type='submit'>
                  Simulate
                </Button>
              }
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