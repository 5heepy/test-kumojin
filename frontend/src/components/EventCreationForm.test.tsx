import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mapFormValuesToEvent } from '../helpers';
import { EventCreationFormValues } from '../models';
import EventCreationForm from './EventCreationForm';

const mockExecute = jest.fn();

jest.mock('../hooks', () => {
  const originalModule = jest.requireActual('../hooks');

  return {
    __esModule: true,
    ...originalModule,
    useCreateEvent: () => ({
      execute: mockExecute,
      loading: false,
    }),
  };
});

describe('EventCreationForm', () => {
  const startDate = '2022-09-09 11:00';
  const endDate = '2022-09-09 11:30';
  const badEndDate = '2022-09-09 10:00';

  const getNameInput = () => {
    return screen.getByTestId('TEST_name_input');
  };

  const getDescriptionInput = () => {
    return screen.getByTestId('TEST_description_input');
  };

  const getStartDateInput = () => {
    return screen.getByTestId('TEST_start_date_input');
  };

  const getEndDateInput = () => {
    return screen.getByTestId('TEST_end_date_input');
  };

  const getTimeZoneInput = () => {
    return screen.getByTestId('TEST_time_zone_input');
  };

  const getSubmitButton = () => {
    return screen.getByRole('button');
  };

  const submitForm = () => {
    const submitButton = getSubmitButton();

    fireEvent.submit(submitButton);
  };

  const fillForm = (values: Partial<EventCreationFormValues>) => {
    fireEvent.input(getNameInput(), {
      target: { value: values.name },
    });
    fireEvent.input(getDescriptionInput(), {
      target: { value: values.description },
    });
    fireEvent.input(getStartDateInput(), {
      target: { value: values.startDate },
    });
    fireEvent.input(getEndDateInput(), {
      target: { value: values.endDate },
    });
    fireEvent.input(getTimeZoneInput(), {
      target: { value: values.timeZone },
    });
  };

  beforeEach(() => {
    render(<EventCreationForm />);
  });

  test('should render name input', async () => {
    const nameInput = getNameInput();
    expect(nameInput).toBeInTheDocument();
  });

  test('should render description input', async () => {
    const descriptionInput = getDescriptionInput();
    expect(descriptionInput).toBeInTheDocument();
  });

  test('should render start date input', async () => {
    const startDateInput = getStartDateInput();
    expect(startDateInput).toBeInTheDocument();
  });

  test('should render end date input', async () => {
    const endDateInput = getEndDateInput();
    expect(endDateInput).toBeInTheDocument();
  });

  test('should render time zone input', () => {
    const timeZoneInput = getTimeZoneInput();
    expect(timeZoneInput).toBeInTheDocument();
  });

  describe('when creating an event', () => {
    describe('with missing name', () => {
      test('should not execute request', async () => {
        fillForm({
          startDate,
          endDate,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with name longer than 32 characters', () => {
      test('should not execute request', async () => {
        fillForm({
          name: 'This is a very long name trying to break the 32 characters barrier',
          startDate,
          endDate,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing start date', () => {
      test('should not execute request', async () => {
        fillForm({
          name: 'test name',
          endDate,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing end date', () => {
      test('should not execute request', async () => {
        fillForm({
          name: 'test name',
          startDate,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with end date before start date', () => {
      test('should not execute request', async () => {
        fillForm({
          name: 'test name',
          startDate,
          endDate: badEndDate,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing time zone', () => {
      test('should not execute request', async () => {
        fillForm({
          name: 'test name',
          startDate,
          endDate: endDate,
          timeZone: undefined,
        });

        submitForm();

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with all required values', () => {
      it('should execute request', async () => {
        const testName = 'test name';
        const testDesc = 'test desc';
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        fillForm({
          name: testName,
          description: testDesc,
          startDate,
          endDate,
          timeZone,
        });

        submitForm();

        const expectedEvent = mapFormValuesToEvent({
          name: testName,
          description: testDesc,
          startDate,
          endDate,
          timeZone,
        });

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledWith(expectedEvent);
        });
      });
    });
  });
});
