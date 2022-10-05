import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'
import { useForm, Controller } from "react-hook-form";

const EventCreationForm = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Create Event
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} />
                  {errors.name && <FormHelperText>Something something error.</FormHelperText>}
                </FormControl>
              )}
            />
        
            <Input type="submit" />
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default EventCreationForm;
