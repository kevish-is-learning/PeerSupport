import "./globals.css";
import AppToaster from "../components/ui/AppToaster";

export const metadata = {
  title: "Peer Support",
  description: "Peer Support platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}