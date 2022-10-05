import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { EventCreationFormValues, EventModel } from '../models';
import { mapFormValuesToEvent } from './event';

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
        }
        
        let result: EventModel;

        beforeEach(() => {
            result = mapFormValuesToEvent(formValues);
        })

        test('it should set name', () => {
            expect(result.name).toEqual(formValues.name);
        });
        test('it should set description', () => {
            expect(result.description).toEqual(formValues.description);
        });
        test('it should set startDate in UTC according to timeZone', () => {
            const expectedDate = dayjs.tz(startDate, timeZone).toISOString();
            expect(result.startDate).toEqual(expectedDate);
        });
        test('it should set endDate in UTC according to timeZone', () => {
            const expectedDate = dayjs.tz(endDate, timeZone).toISOString();
            expect(result.endDate).toEqual(expectedDate);
        });
    })
});
