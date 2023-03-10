import { NextThemeProvider } from '@/src/providers/NextThemesProvider';
import { ReactQueryProvider } from '@/src/providers/ReactQueryProvider';
import { UIProvider } from '@/src/providers/UIProvider';
import '@/src/styles/globals.css';
import '@/src/styles/editor.css';
import Header from '@/ui/Header';
import React from 'react';

export const metadata = {
  title: {
    default: 'Jesus Calamani',
    template: '%s | Jesus Calamani',
  },
  description:
    'Welcome to my portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <NextThemeProvider>
          <ReactQueryProvider>
            <Header />
            <UIProvider>{children}</UIProvider>
          </ReactQueryProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
