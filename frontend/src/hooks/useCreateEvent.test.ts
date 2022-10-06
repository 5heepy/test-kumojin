import { createEventRequest, useCreateEvent } from './useCreateEvent';
import { useFetch } from './useFetch';

jest.mock('./useFetch', () => {
  return {
    __esModule: true,
    useFetch: jest.fn(),
  };
});

describe('useCreateEvent', () => {
  describe('when calling hook', () => {
    it('should call useFetch hook with correct function', () => {
      useCreateEvent();

      expect(useFetch).toHaveBeenCalledWith(createEventRequest);
    });
  });
});
