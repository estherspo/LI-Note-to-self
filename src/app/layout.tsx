
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/shared/Navbar';
import { StateNavigator } from '@/components/shared/StateNavigator';

export const metadata: Metadata = {
  title: 'Rememble - Remember Your Connections',
  description: 'Enhance your networking with private notes and AI-powered insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1 relative"> {/* Added relative for potential z-indexing with sidebar */}
            <StateNavigator />
            <main className="flex-grow container mx-auto px-4 py-8 pb-12 ml-72"> {/* Adjusted padding and added ml-72 */}
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
