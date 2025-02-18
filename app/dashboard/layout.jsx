import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "../Layout/Navbar";
import { Footer } from "../Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wook Sheet - Dashboard",
  description: "Here you Collect the Work History",
};

export default function DashboardLayout({ children }) {
  return (
    <>
    <Navbar/>
        {children}
    <Footer/>
    </>
  );
}
