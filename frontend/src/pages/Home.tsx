import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';

import { EventCreationForm } from '../components';

const HomePage = () => {
  return (
    <Grid gap={6} pl={6}>
      <GridItem>
        <Text fontSize='5xl'>Test Solutions Kumojin</Text>
      </GridItem>
      <GridItem>
        <EventCreationForm />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
