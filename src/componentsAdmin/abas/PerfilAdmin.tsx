"use client";

import { useEffect, useState } from "react";
import { auth } from "@/src/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function PerfilAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
        <p className="text-gray-500">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          👤 Perfil do Administrador
        </h1>

        <button
          onClick={() => router.push("/admin/novoUsuario")}
          className="bg-red-600 hover:bg-red-700 text-white 
          px-5 py-2.5 rounded-xl font-semibold 
          transition-all duration-300 shadow-md 
          shadow-red-600/20 hover:scale-[1.02]"
        >
          + Novo Usuário
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-2xl">
        <div className="space-y-4 text-gray-700">
          <InfoRow label="Email" value={user.email || "-"} />
          <InfoRow label="UID" value={user.uid} />

          {user.metadata?.creationTime && (
            <InfoRow
              label="Conta criada em"
              value={format(
                new Date(user.metadata.creationTime),
                "dd/MM/yyyy 'às' HH:mm",
                { locale: ptBR }
              )}
            />
          )}

          {user.metadata?.lastSignInTime && (
            <InfoRow
              label="Último login"
              value={format(
                new Date(user.metadata.lastSignInTime),
                "dd/MM/yyyy 'às' HH:mm",
                { locale: ptBR }
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= helpers ================= */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-semibold text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 break-all">
        {value}
      </span>
    </div>
  );
}