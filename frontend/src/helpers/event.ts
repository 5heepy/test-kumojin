import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { EventCreationFormValues, EventModel } from '../models';

dayjs.extend(utc);
dayjs.extend(timezone);

export const mapFormValuesToEvent = (
  formValues: EventCreationFormValues
): EventModel => {
  return {
    name: formValues.name,
    description: formValues.description,
    startDate: dayjs
      .tz(formValues.startDate, formValues.timeZone)
      .toISOString(),
    endDate: dayjs.tz(formValues.endDate, formValues.timeZone).toISOString(),
  } as EventModel;
};

export const validateEndDate = (startDate: string, endDate: string) => {
  return dayjs(endDate).isAfter(startDate)
    ? true
    : 'End date should be after start date';
};
