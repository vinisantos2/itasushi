import FaixaLateral from "./FaixaLateral";
import Footer from "./Footer";
import Header from "./Header";
import SubFooter from "./SubFooter";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const GA_ID = "G-4XKV3C5HZR";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <SubFooter />
        <Toaster position="top-center" />
      </div>
    </>
  );
}