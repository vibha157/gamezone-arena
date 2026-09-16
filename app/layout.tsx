import type { Metadata } from "next";
import "./globals.css";
import { Chatbot } from "../components/chatbot";

export const metadata: Metadata = {
  title: "GameZone Arena | Play. Compete. Repeat.",
  description: "Book premium arcade and recreation sessions at GameZone Arena.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
