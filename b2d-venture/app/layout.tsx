import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import AuthProvider from "@/components/Providers";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "B2D Venture",
  description: "B2D Venture is a platform for startup investment.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
