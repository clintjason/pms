import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';

const AvatarComponent = ({ user }) => {
  return (
    <Card sx={{ width: '100%'}}>
      <CardContent>
        <Typography variant="h6" color="primary">{user?.username}</Typography>
        <Avatar
          alt={user?.username}
          src={user?.avatar}
          sx={{ width: 100, height: 100,}}
        />
      </CardContent>
    </Card>
  );
};

export default AvatarComponent;