import axios from 'axios';
import { EventModel } from '../models';
import { useFetch } from './useFetch';

export const useCreateEvent = () => {
  const fetcher = (event: EventModel) =>
    axios.post('/events', event, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return useFetch(fetcher);
};
