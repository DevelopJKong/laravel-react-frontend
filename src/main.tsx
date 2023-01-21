import React from 'react';
import './styles/styles.css';
import ReactDOM from 'react-dom/client';
import App from './app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
