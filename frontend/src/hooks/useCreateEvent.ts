import axios from 'axios';
import { EventModel } from '../models';
import { useFetch } from './useFetch';

export const useCreateEvent = () => {
  const fetcher = (event: EventModel) =>
    axios.post('events', event, {
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return useFetch(fetcher);
};
