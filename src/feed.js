import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './feed.css'

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        user name
      </Typography>
      <Typography variant="h5" component="div">
        Event Name
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        date location type
      </Typography>
      <Typography variant="body2">
        entire description
        <br />
        more lines
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Interested</Button>
    </CardActions>
  </React.Fragment>
);

export default function Feed() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
      <Card variant="outlined">{card}</Card>
      <Card variant="outlined">{card}</Card>
      <Card variant="outlined">{card}</Card>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
