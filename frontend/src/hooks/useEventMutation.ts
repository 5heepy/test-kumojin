import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { EventModel, QueryOptions } from '../models';
import { useToast } from '@chakra-ui/react';

export const createEventRequest = (event: EventModel) =>
  axios.post<EventModel>('events', event, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export const useEventMutation = ({ onSuccess, onError }: QueryOptions) => {
  const toast = useToast();

  return useMutation(createEventRequest, {
    onSuccess: (result) => {
      toast({
        description: `Event ${result.data.name} created.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      });

      onSuccess?.();
    },
    onError: () => {
      toast({
        description: 'There was an error trying to create the event.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
        position: 'bottom-right',
      });

      onError?.();
    },
  });
};
