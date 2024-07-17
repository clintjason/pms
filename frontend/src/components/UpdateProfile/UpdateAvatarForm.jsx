import React, { useState } from 'react';
import { Typography, Button, Grid, Paper, CircularProgress, Snackbar, Alert, Avatar } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { object as YupObject, mixed as YupMixed } from 'yup';
import { apiUpdateAvatar } from '../../services/api.service';

const ValidatorSchema = YupObject().shape({
  avatar: YupMixed().required('Avatar is required').test(
    'fileSize',
    'File Size is too large',
    value => !value || (value && value.size <= 2000000)
  )
});

const UpdateAvatarForm = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', values.avatar);
      const userId = user.id;
      let data = await apiUpdateAvatar(formData, userId);
      setLoading(false);
      setOpen(true);
      console.log("Data received: " + data);
    } catch (error) {
      console.error("UpdatePatientAvatar Error: ", error);
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
          Update Avatar
        </Typography>
        <Formik
          initialValues={{ avatar: null }}
          validationSchema={ValidatorSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container spacing={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <Grid item xs={12}>
                      <input
                        name="avatar"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("avatar", file);
                          setPreview(URL.createObjectURL(file));
                        }}
                        style={{ display: 'none' }}
                        id="avatar-upload"
                      />
                      <label htmlFor="avatar-upload">
                        <Button variant="contained" color="primary" component="span">
                          Upload Avatar
                        </Button>
                      </label>
                      {touched.avatar && Boolean(errors.avatar) && (
                        <div style={{ color: 'red', marginTop: '0.5rem' }}>{errors.avatar}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Button variant="contained" color="primary" disabled={loading} type='submit'>
                          Update Avatar
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {preview && (
                  <Grid item xs={6}>
                    <Avatar
                      alt="Avatar Preview"
                      src={preview}
                      sx={{ width: 100, height: 100}}
                    />
                  </Grid>
                )}
                
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Avatar updated successfully!
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

export default UpdateAvatarForm;