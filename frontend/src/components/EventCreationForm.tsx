import { ianaTimeZones } from '../helpers';
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
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateEvent } from '../hooks';
import { EventModel } from '../models';
import dayjs, {} from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
dayjs.extend(timezone)

const endDateErrorMessage = (error: { [key: string]: any }) => {
  switch (error.type) {
    case 'higherThanStartDate':
      return 'End date should be after start date.';
    default:
      return 'Required.';
  }
};

const EventCreationForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { execute, loading } = useCreateEvent();

  const onSubmit = (data: any) => {
    const event: EventModel = {
      ...data,
      startDate: dayjs(data.startDate).tz(data.timeZone),
      endDate: dayjs(data.endDate).tz(data.timeZone),
    }

    execute(event);
  };

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
                      higherThanStartDate: (value) =>
                        value > getValues().startDate,
                    },
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>End date</FormLabel>
                      <Input {...field} type='datetime-local' />
                      {errors.endDate && (
                        <FormHelperText>
                          {endDateErrorMessage(errors.endDate)}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name='timeZone'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>End date</FormLabel>
                      <Select {...field} placeholder='Select Time Zone' defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                        {ianaTimeZones.map(timeZone => (
                          <option value={timeZone}>{timeZone}</option>
                        ))}
                      </Select>
                      {errors.timeZone && (
                        <FormHelperText>Required.</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </GridItem>

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
