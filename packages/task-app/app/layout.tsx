import './style/tailwind-globals.css';
import { Providers } from './providers';
import { Montserrat } from 'next/font/google';
 
const font = Montserrat({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: './favicon.ico',
  },
};

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <meta charSet="UTF-8"/>
        <link rel='icon' href='./favicon.ico'/>
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
