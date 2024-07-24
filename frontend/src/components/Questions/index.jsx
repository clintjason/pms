import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';

const Questions = () => {
  const [question, setQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);

  const handleSubmit = () => {
    if (question) {
      setQuestionsList([...questionsList, question]);
      setQuestion('');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" color='primary' gutterBottom>
        Ask a Question
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
        <TextField
          label="Your Question"
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <List>
        {questionsList.map((q, index) => (
          <ListItem key={index}>
            <ListItemText primary={q} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Questions;