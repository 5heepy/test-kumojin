import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
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

  beforeEach(() => {
    render(<EventCreationForm />);
  })

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
        const startDateInput = getStartDateInput();
        const endDateInput = getEndDateInput();
        const submitButton = getSubmitButton();

        fireEvent.input(startDateInput, {
          target: { value: startDate },
        });
        fireEvent.input(endDateInput, {
          target: { value: endDate },
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing start date', () => {

      test('should not execute request', async () => {
        const nameInput = getNameInput();
        const endDateInput = getEndDateInput();
        const submitButton = getSubmitButton();

        fireEvent.input(nameInput, {
          target: { value: 'test name' },
        });
        fireEvent.input(endDateInput, {
          target: { value: endDate },
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing end date', () => {
      test('should not execute request', async () => {
        const nameInput = getNameInput();
        const startDateInput = getStartDateInput();
        const submitButton = getSubmitButton();

        fireEvent.input(nameInput, {
          target: { value: 'test name' },
        });
        fireEvent.input(startDateInput, {
          target: { value: startDate },
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with end date before start date', () => {
      test('should not execute request', async () => {
        const nameInput = getNameInput();
        const startDateInput = getStartDateInput();
        const endDateInput = getEndDateInput();
        const submitButton = getSubmitButton();

        fireEvent.input(nameInput, {
          target: { value: 'test name' },
        });
        fireEvent.input(startDateInput, {
          target: { value: startDate },
        });
        fireEvent.input(endDateInput, {
          target: { value: badEndDate },
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with missing time zone', () => {
      test('should not execute request', async () => {
        const nameInput = getNameInput();
        const startDateInput = getStartDateInput();
        const endDateInput = getEndDateInput();
        const timeZoneInput = getTimeZoneInput();
        const submitButton = getSubmitButton();

        fireEvent.input(nameInput, {
          target: { value: 'test name' },
        });
        fireEvent.input(startDateInput, {
          target: { value: startDate },
        });
        fireEvent.input(endDateInput, {
          target: { value: endDate },
        });
        fireEvent.input(timeZoneInput, {
          target: { value: null },
        });
        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('with all required values', () => {
      it('should execute request', async () => {
        const nameInput = getNameInput();
        const descriptionInput = getDescriptionInput();
        const startDateInput = getStartDateInput();
        const endDateInput = getEndDateInput();
        const submitButton = getSubmitButton();

        fireEvent.input(nameInput, {
          target: { value: 'test name' },
        });

        fireEvent.input(descriptionInput, {
          target: { value: 'test desc' },
        });

        fireEvent.input(startDateInput, {
          target: { value: startDate },
        });
        fireEvent.input(endDateInput, {
          target: { value: endDate },
        });

        fireEvent.submit(submitButton);

        await waitFor(() => {
          expect(mockExecute).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
