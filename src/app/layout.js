
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";
import { Provider } from "react-redux";
import store from "@/store";
import ClientWrapper from "./components/ClientWrapper";
import ClientVerifyLogedin from "./components/ClientVerifyLogedIn";


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
  
      <ClientWrapper>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          >
            <ToastProvider/>
            <ClientVerifyLogedin/>
            <Navbar/>
            <main className="pt-20 mb-5 container mx-auto flex-1">{children}</main>
            <Footer/>
          </body>
        </html>
      </ClientWrapper>
  
  );
}
