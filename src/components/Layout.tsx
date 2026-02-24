import FaixaLateral from "./FaixaLateral";
import Footer from "./Footer";
import Header from "./Header";
import SubFooter from "./SubFooter";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* 🔴 Faixa vermelha lateral forte com fade */}

      <main className="flex-1">
        
        {children}
      </main>

      <Footer />
      <SubFooter />
      <Toaster position="top-center" />
    </div>
  );
}
