import clsx from 'clsx';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './global.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
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
      <body
        className={clsx(
          poppins.className,
          'min-h-screen bg-[#0D0D0E] text-primary-light'
        )}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
