import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
