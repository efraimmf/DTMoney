"use client"

import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const queryClient = new QueryClient();

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export default function RootLayout({ children}: { children: React.ReactNode, pageProps: any }) {
    return (
        <html lang="en">
        <head>
            <title>DTMoney</title>
        </head>
        <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </body>
        </html>
    );
}