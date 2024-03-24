import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider,SignIn } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EV AZ ",
  description: "EV Car Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <SignedIn>
          <NavBar/>
        {children}

        </SignedIn>

        <SignedOut>
        <SignIn/>
        </SignedOut>
                 
        </body>
    </html>
    </ClerkProvider>
  );
}