import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  GridItem,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';

const endDateErrorMessage = (error: { [key: string]: any }) => {
  switch (error.type) {
    case "higherThanStartDate":
      return "End date should be after start date.";
    default:
      return "Required.";
  }
}

const EventCreationForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  console.log({ errors });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left' pl={6}>
              Create Event
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid gap={6} pl={6} w='50%'>
              <GridItem>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input {...field} />
                      {errors.name && (
                        <FormHelperText>Required.</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea {...field} />
                    </FormControl>
                  )}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name='startDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Start date</FormLabel>
                      <Input {...field} type='datetime-local' />
                      {errors.startDate && (
                        <FormHelperText>Required.</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name='endDate'
                  control={control}
                  rules={{ 
                    required: true,
                    validate: {
                      higherThanStartDate: value => value > getValues().startDate,
                    }
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>End date</FormLabel>
                      <Input {...field} type='datetime-local' />
                      {errors.endDate && (
                        <FormHelperText>{endDateErrorMessage(errors.endDate)}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </GridItem>

              {/* //TODO: add timezone selector */}
              <GridItem>
                <Input type='submit' />
              </GridItem>
            </Grid>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default EventCreationForm;
