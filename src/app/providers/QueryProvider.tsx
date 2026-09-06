import React,{ type FC} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:1000*60,
            retry:1,
            refetchOnWindowFocus:false,
        }
    }
});

interface  IQueryProviderProps { 
children:React.ReactNode
}
const QueryProvider:FC<IQueryProviderProps> = ({children}) => {

  return (
    <QueryClientProvider client={queryClient}>
   {children}
 <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
  );
};

export default QueryProvider;