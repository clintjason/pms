import * as Yup from 'yup';

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

export const passwordValidationSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password cannot be longer than 128 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

export const usernameValildationSchema = Yup.string()
  .required('Username is required')
  .matches(/^[a-zA-Z0-9_.]*$/, 'Username can only contain letters, numbers, underscores, and dots')
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot be longer than 20 characters')
  .trim('Username cannot include leading or trailing spaces');

export const emailValidationSchema = Yup.string().email('Invalid email').required('Email is required');

export const roleValidationSchema = Yup.string()
  .required('Role is required')
  .oneOf(['admin', 'patient', 'doctor'], 'Invalid role');

export const temperatureTypeValidationSchema = Yup.string()
.required('Temperature Type is required')
.oneOf(['Oral', 'Axillary', 'Rectal', 'Tympanic', 'Temporal'], 'Invalid Temperature Type');
  
export const symptomsValidationSchema = Yup.array()
.of(Yup.string().oneOf(["Fever", "Shortness of breath", "Rapid heartbeat", "Dizziness", "Sweating", "Fatigue", "No symptoms"]))
.min(1, 'At least one symptom must be selected')
.max(6, 'You can only select up to 6 symptoms')
.required('Symptoms are required');

export const conditionValidationSchema = Yup.array()
.of(Yup.string().oneOf(conditions))
.min(1, 'At least one condition must be selected')
.max(10, 'You can only select up to 10 conditions')
.required('Conditions are required');

export const feedbackValidationSchema = Yup.string()
.required('Feedback is required')
.min(10, 'Feedback must be at least 10 characters long')
.max(500, 'Feedback must be no more than 500 characters long')
.matches(/[a-zA-Z0-9\s]+/, 'Feedback can only contain letters, numbers, and spaces')
.trim('Username cannot include leading or trailing spaces');

export const termsAndConditionsValidationSchema = Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Required');