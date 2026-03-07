import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "PeerSupport - Connect with Mentors",
  description: "Find expert mentors for your CAT preparation and career guidance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
