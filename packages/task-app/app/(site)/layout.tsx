import HeaderNav from './components/nav';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
     <link rel='icon' href='/favicon.ico'/>
    <HeaderNav />
    {
      children
    }
    </>
  );
}
