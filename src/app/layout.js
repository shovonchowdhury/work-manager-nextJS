
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  // console.log("Hydrating RootLayout on client...");
  // console.log("Window is defined: ", typeof window !== "undefined");
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
         <ToastProvider/>
        <Navbar/>
        <main className="pt-20 mb-5 container mx-auto flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
