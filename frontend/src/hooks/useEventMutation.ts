import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { EventModel, QueryOptions } from '../models';
import { useFormNotification } from './useFormNotification';

export const createEventRequest = (event: EventModel) =>
  axios.post<EventModel>('events', event, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export const useEventMutation = ({ onSuccess, onError }: QueryOptions) => {
  const [notifySuccess, notifyError] = useFormNotification();

  return useMutation(createEventRequest, {
    onSuccess: (result) => {
      notifySuccess({ description: `Event ${result.data.name} created.` });

      onSuccess?.();
    },
    onError: () => {
      notifyError({
        description: 'There was an error trying to create the event.',
      });

      onError?.();
    },
  });
};
