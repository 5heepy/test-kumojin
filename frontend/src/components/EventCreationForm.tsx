import { mapFormValuesToEvent, ianaTimeZones } from '../helpers';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  GridItem,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateEvent } from '../hooks';
import { EventCreationFormValues } from '../models';
import { useCallback } from 'react';
import dayjs from 'dayjs';

const formDefaultValues = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

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
  } = useForm<EventCreationFormValues>({ defaultValues: formDefaultValues });

  const { execute, loading } = useCreateEvent();

  const onSubmit = useCallback(
    async (data: EventCreationFormValues) => {
      const event = mapFormValuesToEvent(data);
      await execute(event);
    },
    [execute]
  );

  return (
    <Stack spacing={6}>
      <Text fontSize='3xl'>Create Event</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={6} w='50%'>
          <GridItem>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl isDisabled={loading}>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} data-testid='TEST_name_input' />
                  {errors.name && <FormHelperText data-testid='TEST_name_error'>Required.</FormHelperText>}
                </FormControl>
              )}
            />
          </GridItem>

          <GridItem>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <FormControl isDisabled={loading}>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} data-testid='TEST_description_input' />
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
                <FormControl isDisabled={loading}>
                  <FormLabel>Start date</FormLabel>
                  <Input
                    {...field}
                    type='datetime-local'
                    data-testid='TEST_start_date_input'
                  />
                  {errors.startDate && (
                    <FormHelperText data-testid='TEST_start_date_error'>Required.</FormHelperText>
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
                    dayjs(value).isAfter(getValues().startDate),
                },
              }}
              render={({ field }) => (
                <FormControl isDisabled={loading}>
                  <FormLabel>End date</FormLabel>
                  <Input
                    {...field}
                    type='datetime-local'
                    data-testid='TEST_end_date_input'
                  />
                  {errors.endDate && (
                    <FormHelperText data-testid='TEST_end_date_error'>
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
                <FormControl isDisabled={loading}>
                  <FormLabel>Time Zone</FormLabel>
                  <Select
                    {...field}
                    placeholder='Select Time Zone'
                    data-testid='TEST_time_zone_input'
                  >
                    {ianaTimeZones.map((timeZone) => (
                      <option key={timeZone} value={timeZone}>
                        {timeZone}
                      </option>
                    ))}
                  </Select>
                  {errors.timeZone && (
                    <FormHelperText data-testid='TEST_time_zone_error'>Required.</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </GridItem>

          <GridItem>
            <Button type='submit' width='xs' data-testid="TEST_submit_button">
              {loading ? <Spinner size='md' /> : 'Create'}
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Stack>
  );
};

export default EventCreationForm;
