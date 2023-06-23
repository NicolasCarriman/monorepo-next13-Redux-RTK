import './style/tailwind-globals.css';
import { Providers } from './providers';
import { Montserrat } from 'next/font/google';
 
const font = Montserrat({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <meta charSet="UTF-8"/>
        <link rel='icon' href='/favicon.ico'/>
        <title>T-Task</title>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
