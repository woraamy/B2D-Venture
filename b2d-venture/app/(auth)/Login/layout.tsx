import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="flex h-screen flex-col">
          <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }