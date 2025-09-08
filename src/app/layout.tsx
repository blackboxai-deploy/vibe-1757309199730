import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeuroVox - Brain Signal Translation for Communication',
  description: 'Revolutionary assistive technology helping individuals with speech impairments communicate naturally through non-invasive brain-signal translation.',
  keywords: ['assistive technology', 'brain signals', 'communication', 'accessibility', 'NeuroVox'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-slate-800 border-t border-slate-700 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-300 text-sm">
                © 2024 NeuroVox by Team Vianra. Built with empathy, innovation, and purpose.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                NeuroVox — Transforming Silence into Hope
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}