// components/HeaderAdmin.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

interface HeaderAdminProps {
  userName: string;
  onLogout: () => void;
}

export default function HeaderAdmin({
  userName,
  onLogout,
}: HeaderAdminProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* 🔴 Logo ITA */}
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">ITA</span>
          </div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Painel <span className="text-red-600">Admin</span>
          </span>
        </Link>

        {/* 👤 Usuário */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition font-medium text-gray-800"
          >
            <span className="hidden sm:inline">{userName}</span>

            <svg
              className={`w-4 h-4 transform transition ${
                menuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 📂 Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
              
              <button
                onClick={() => {
                  router.push("/admin/novoCardapio");
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium"
              >
                🍣 Novo Cardápio
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium"
              >
                🚪 Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}