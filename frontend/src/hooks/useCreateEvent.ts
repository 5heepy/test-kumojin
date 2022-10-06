import axios from 'axios';
import { EventModel } from '../models';
import { useFetch } from './useFetch';

export const createEventRequest = (event: EventModel) =>
  axios.post('events', event, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export const useCreateEvent = () => {
  return useFetch(createEventRequest);
};
