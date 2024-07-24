import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link, Box } from '@mui/material';

const HelpfulResources = () => {
  const resources = [
    { title: 'How to Take Your Temperature', url: 'https://example.com/take-temperature' },
    { title: 'Monitoring Your Heart Rate', url: 'https://example.com/heart-rate' },
    { title: 'Respiration Rate Guide', url: 'https://example.com/respiration-rate' },
    { title: 'Understanding Vital Signs', url: 'https://example.com/understanding-vitals' },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Helpful Resources
      </Typography>
      <List>
        {resources.map((resource, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Link href={resource.url} target="_blank" rel="noopener">
                {resource.title}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default HelpfulResources;