"use client";

import { Title } from "../components/Title";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/firebase/firebaseConfig";

export function AboutSection() {
  const [fachadaUrl, setFachadaUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function loadFachada() {
      try {
        const ref = doc(db, "site", "institucional");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setFachadaUrl(snap.data().fachadaUrl || null);
        }
      } catch (error) {
        console.error("Erro ao carregar fachada:", error);
      }
    }

    loadFachada();
  }, []);

  const showPlaceholder = !fachadaUrl || imgError;

  return (
    <section
      id="sobre"
      className="relative py-24 px-4 overflow-hidden bg-gray-50"
    >
      {/* glow vermelho da marca */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-red-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* 📸 Imagem */}
        <div className="relative group">
          <div className="w-full h-[320px] md:h-[420px] rounded-2xl shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
            {!showPlaceholder ? (
              <img
                src={fachadaUrl as string}
                alt="Ita Sushi Bar"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                {/* ícone */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16l4-4a3 3 0 014 0l4 4m-1-1l1-1a3 3 0 014 0l2 2M3 7h18M4 7h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"
                  />
                </svg>

                <span className="text-sm font-medium">
                  Fachada sem imagem
                </span>
              </div>
            )}
          </div>

          {/* overlay escuro */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

          {/* borda vermelha */}
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600/40 to-transparent blur-md opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* 📝 Texto */}
        <div className="rounded-2xl p-8 shadow-xl border bg-white border-gray-200">
          <Title
            title="Sobre o Ita Sushi Bar"
            subtitle="Tradição japonesa com sabor e qualidade"
          />

          <p className="text-gray-800 text-lg leading-relaxed mt-6 text-justify">
            O Ita Sushi Bar nasceu da paixão pela culinária japonesa e pelo
            desejo de oferecer uma experiência única em cada prato. Trabalhamos
            com ingredientes frescos, cortes precisos e muito cuidado em cada
            detalhe. Nosso ambiente foi pensado para ser acolhedor e moderno,
            perfeito para quem busca sabor autêntico, qualidade e um atendimento
            de excelência.
          </p>

          {/* 🔴 destaque da marca */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[3px] bg-red-600 rounded-full" />
            <span className="text-sm font-bold tracking-widest text-red-600">
              QUALIDADE • TRADIÇÃO • SABOR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}