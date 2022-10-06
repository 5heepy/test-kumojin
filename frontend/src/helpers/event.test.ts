import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { EventCreationFormValues, EventModel } from '../models';
import { mapFormValuesToEvent, validateEndDate } from './event';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('mapFormValuesToEvent', () => {
  const startDate = dayjs().toString();
  const endDate = dayjs(startDate).add(1, 'hour').toISOString();
  const timeZone = 'America/Los_Angeles';

  describe('when mapping with a timezone', () => {
    const formValues: EventCreationFormValues = {
      name: 'Test event',
      description: 'Test description',
      startDate,
      endDate,
      timeZone,
    };

    let result: EventModel;

    beforeEach(() => {
      result = mapFormValuesToEvent(formValues);
    });

    it('should set name', () => {
      expect(result.name).toEqual(formValues.name);
    });
    it('should set description', () => {
      expect(result.description).toEqual(formValues.description);
    });
    it('should set startDate in UTC according to timeZone', () => {
      const expectedDate = dayjs.tz(startDate, timeZone).toISOString();
      expect(result.startDate).toEqual(expectedDate);
    });
    it('should set endDate in UTC according to timeZone', () => {
      const expectedDate = dayjs.tz(endDate, timeZone).toISOString();
      expect(result.endDate).toEqual(expectedDate);
    });
  });
});

describe('validateEndDate', () => {
  const startDate = dayjs().toString();

  describe('with end date before start date', () => {
    const endDate = dayjs(startDate).subtract(1, 'hour').toISOString();

    it('should return error message', () => {
      const result = validateEndDate(startDate, endDate);
      expect(result).toEqual('End date should be after start date');
    });
  });

  describe('with end date after start date', () => {
    const endDate = dayjs(startDate).add(1, 'hour').toISOString();

    it('should return true', () => {
      const result = validateEndDate(startDate, endDate);
      expect(result).toBeTruthy();
    });
  });
});
