export interface EventModel {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EventCreationFormValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  timeZone: string;
}
