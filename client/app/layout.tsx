import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Arbabcollection | Global Online Store',
  description: 'Shop watches, laptops, groceries, makeup, fashion, and more at Arbabcollection — founded by Arbab.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
