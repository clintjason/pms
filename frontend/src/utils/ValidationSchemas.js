import * as Yup from 'yup';

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

export const termsAndConditionsValidationSchema = Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Required');