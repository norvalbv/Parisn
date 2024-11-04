import clsx from 'clsx';
import type { Metadata } from 'next';
import { Poppins, PT_Mono } from 'next/font/google';
import './global.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const cormorant = PT_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Parisen Global',
  description:
    'Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement => {
  return (
    <html lang="en">
      <body className={clsx(          poppins.variable,
          cormorant.variable,
          'font-sans antialiased',
          'min-h-screen bg-background text-text-primary',
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
