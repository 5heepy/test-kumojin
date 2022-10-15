import {
  mapFormValuesToEvent,
  ianaTimeZones,
  validateEndDate,
} from '../helpers';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { EventCreationFormValues } from '../models';
import { useCallback, useEffect } from 'react';
import { FetchStatus } from '../enums';
import { useCreateEvent } from '../hooks';

const formDefaultValues: EventCreationFormValues = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const EventCreationForm = () => {
  const {
    handleSubmit,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm<EventCreationFormValues>({ defaultValues: formDefaultValues });

  const { execute, status, result } = useCreateEvent();

  const toast = useToast();

  const onSubmit = useCallback(
    async (data: EventCreationFormValues) => {
      const event = mapFormValuesToEvent(data);
      await execute(event);
    },
    [execute]
  );

  useEffect(() => {
    if (status === FetchStatus.SUCCESS) {
      reset(formDefaultValues);

      toast({
        description: `Event ${result?.name} created.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });
    }
  }, [reset, result, status, toast]);

  useEffect(() => {
    if (status === FetchStatus.ERROR) {
      toast({
        description: 'There was an error trying to create the event.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
        position: 'bottom-right',
      });
    }
  }, [status, toast]);

  const isLoading = status === FetchStatus.FETCHING;

  return (
    <Stack spacing={6}>
      <Text fontSize="3xl">Create Event</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={6} w="50%">
          <GridItem>
            <FormControl isDisabled={isLoading} isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                data-testid="TEST_name_input"
                id="name"
                placeholder="Name"
                {...register('name', {
                  required: 'Required',
                  maxLength: {
                    value: 32,
                    message: 'Event name cannot be longer than 32 characters',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl
              isDisabled={isLoading}
              isInvalid={!!errors.description}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                data-testid="TEST_description_input"
                id="description"
                placeholder="Description"
                {...register('description')}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isDisabled={isLoading} isInvalid={!!errors.startDate}>
              <FormLabel htmlFor="startDate">Start date</FormLabel>
              <Input
                data-testid="TEST_start_date_input"
                id="startDate"
                placeholder="Start date"
                type="datetime-local"
                {...register('startDate', {
                  required: 'Required',
                })}
              />
              <FormErrorMessage>
                {errors.startDate && errors.startDate.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isDisabled={isLoading} isInvalid={!!errors.endDate}>
              <FormLabel htmlFor="endDate">End date</FormLabel>
              <Input
                data-testid="TEST_end_date_input"
                id="endDate"
                placeholder="End date"
                type="datetime-local"
                {...register('endDate', {
                  required: 'Required',
                  validate: {
                    higherThanStartDate: (value) =>
                      validateEndDate(getValues().startDate, value),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.endDate && errors.endDate.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isDisabled={isLoading} isInvalid={!!errors.timeZone}>
              <FormLabel htmlFor="timeZone">Time Zone</FormLabel>
              <Select
                id="timeZone"
                placeholder="Select Time Zone"
                data-testid="TEST_time_zone_input"
                {...register('timeZone', {
                  required: 'Required',
                })}
              >
                {ianaTimeZones.map((timeZone) => (
                  <option key={timeZone} value={timeZone}>
                    {timeZone}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.timeZone && errors.timeZone.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <Button
              data-testid="TEST_submit_button"
              type="submit"
              width="xs"
              isLoading={isLoading}
            >
              Create
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Stack>
  );
};

export default EventCreationForm;
