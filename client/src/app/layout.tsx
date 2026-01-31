import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nurtura - Family Healthcare',
  description: 'Nurturing your family\'s health - growing stronger together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-pistachio-light via-white to-azure-mist">
        {children}
      </body>
    </html>
  );
}
