'use client';
import { ThemeProvider, useTheme } from 'next-themes'


export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  // const data = useTheme()
  // console.log('data', data)
  return (
    <ThemeProvider attribute="class" defaultTheme = 'system'>
        {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </ThemeProvider>
  );
}