"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirectAdmin } from "../../hoohsAdmin/useAuthRedirectAdmin";
import { auth } from "@/src/firebase/firebaseConfig";
import HeaderAdmin from "@/src/componentsAdmin/HeaderAdmin";
import Loading from "@/src/componentsAdmin/Loading";
import CardapioAdmin from "@/src/pages/admin/abas/CardapioAdmin";
import PerfilAdmin from "@/src/pages/admin/abas/PerfilAdmin";

export default function HomeAdmin() {
  const { loading } = useAuthRedirectAdmin();
  const router = useRouter();
  const [aba, setAba] = useState<"cardapio" | "perfil">("cardapio");

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* 🔴 SIDEBAR PREMIUM */}
      <aside className="w-64 bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white flex flex-col py-6 px-4 shadow-2xl">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">
            ITA Sushi
          </h2>
          <p className="text-xs text-red-100 tracking-[0.25em] mt-1">
            ADMIN PANEL
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setAba("cardapio")}
            className={`group text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium
              ${
                aba === "cardapio"
                  ? "bg-white text-red-700 shadow-lg"
                  : "text-red-100 hover:bg-white/15 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2">
              <span>🍣</span>
              Cardápio
            </span>
          </button>

          <button
            onClick={() => setAba("perfil")}
            className={`group text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium
              ${
                aba === "perfil"
                  ? "bg-white text-red-700 shadow-lg"
                  : "text-red-100 hover:bg-white/15 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2">
              <span>👤</span>
              Perfil
            </span>
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            auth.signOut();
            router.push("/admin/login");
          }}
          className="mt-auto bg-black/25 hover:bg-black/40 
          px-4 py-3 rounded-xl text-white font-semibold 
          transition-all duration-300 border border-white/10"
        >
          Sair
        </button>
      </aside>

      {/* 🔥 MAIN */}
      <div className="flex-1 flex flex-col">
        {/* Header mais limpo */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <HeaderAdmin
            userName={auth.currentUser?.email || ""}
            onLogout={() => {
              auth.signOut();
              router.push("/admin/login");
            }}
          />
        </div>

        {/* Conteúdo */}
        <main className="flex-1 p-6 md:p-10 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              {aba === "cardapio" && <CardapioAdmin />}
              {aba === "perfil" && <PerfilAdmin />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}