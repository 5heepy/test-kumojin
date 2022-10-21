import { HomePage } from './pages';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <HomePage />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
