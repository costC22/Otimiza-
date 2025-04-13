import type { Metadata } from 'next';
import {Geist, Geist_Mono} from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Otimiza+ - System Optimizer',
  description: 'Optimize your system for peak performance.',
  /*
  Leaving font-family in layout.tsx to be applied globally since
  that approach seemed to work before, but adding fonts here in metadata.ts
  since that is the place we want to define this stuff.
  */
  //fontFamily: `${geistSans.variable} ${geistMono.variable} antialiased`
};
