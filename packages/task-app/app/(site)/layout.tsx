import HeaderNav from './components/nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <HeaderNav />
    {
      children
    }
    </>
  );
}
