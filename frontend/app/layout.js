import "./globals.css";

export const metadata = {
  title: "Peer Support",
  description: "Peer Support platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}