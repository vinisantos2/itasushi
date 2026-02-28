import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menu = [
  { nome: "Início", url: "/" },
  { nome: "Sobre", url: "#sobre" },
  { nome: "Contato", url: "#contato" },
  { nome: "Cardápio", url: "/cardapio" },
  // { nome: "Depoimentos", url: "#depoimentos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 🔴 Logo ITA */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">ITA</span>
          </div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Sushi <span className="text-red-600">Bar</span>
          </span>
        </Link>

        {/* 📱 Botão Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 hover:text-red-600 transition"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* 📌 Menu */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:items-center md:space-x-8
          absolute md:static left-0 top-full w-full md:w-auto
          bg-white md:bg-transparent
          px-6 md:px-0 py-5 md:py-0
          shadow-lg md:shadow-none border-b md:border-0 border-gray-200`}
        >
          {menu.map((item) => (
            <Link key={item.nome} href={item.url} onClick={() => setMenuOpen(false)}>
              <span className="block text-gray-700 md:text-gray-800
                hover:text-red-600
                font-medium
                transition-all duration-200
                py-2 md:py-0
                border-b-2 border-transparent
                hover:border-red-600
                text-base md:text-sm tracking-wide cursor-pointer">
                {item.nome}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}