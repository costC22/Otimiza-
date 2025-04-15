'use client';

import './globals.css';
import { Geist } from 'next/font/google';
import {metadata} from './metadata';
import React from "react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-BR">
      <body className={geistSans.className}>
        
            
              {children}
            
        
      
      </body>
    </html>
  );
}

export default RootLayout;


