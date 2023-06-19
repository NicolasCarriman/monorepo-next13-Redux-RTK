'use client';

import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '@core/index';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Provider store={store} >
        {children}
      </Provider>
    </ThemeProvider>
  );
}
