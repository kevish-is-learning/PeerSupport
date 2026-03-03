import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PeerSupport',
  description: 'Connect with mentors and mentees',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
