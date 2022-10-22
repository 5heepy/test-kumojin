import { useToast } from '@chakra-ui/react';
import type { CreateToastFnReturn, UseToastOptions } from '@chakra-ui/react';

interface DisplayOptions {
  title?: string;
  description?: string;
  status: UseToastOptions['status'];
}

const displayToast = (
  toast: CreateToastFnReturn,
  { title, description, status }: DisplayOptions
) => {
  toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
    variant: 'left-accent',
    position: 'bottom-right',
  });
};

export const useFormNotification = () => {
  const toast = useToast();

  const notifySuccess = (options: Omit<DisplayOptions, 'status'>) =>
    displayToast(toast, { ...options, status: 'success' });

  const notifyError = (options: Omit<DisplayOptions, 'status'>) =>
    displayToast(toast, { ...options, status: 'error' });

  return [notifySuccess, notifyError];
};
