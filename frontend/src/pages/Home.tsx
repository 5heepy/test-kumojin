import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { EventCreationForm } from '../components';

const HomePage = () => {
  return (
    <Grid gap={6}>
      <GridItem>Test Solutions Kumojin</GridItem>
      <GridItem>
        <EventCreationForm />
      </GridItem>
    </Grid>
  );
}

export default HomePage;