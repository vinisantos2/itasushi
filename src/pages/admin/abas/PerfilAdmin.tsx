"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { uploadFachada } from "@/src/firebase/uploadImage";
import ImageUploader from "@/src/componentsAdmin/ImageUploader";

export default function PerfilAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [fachadaUrl, setFachadaUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loadingFachada, setLoadingFachada] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

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

    return () => unsubscribe();
  }, []);

  async function handleUploadFachada() {
    if (!file) return;

    try {
      setLoadingFachada(true);

      // ✅ agora o arquivo já vem convertido do uploader
      const url = await uploadFachada(file);

      await setDoc(
        doc(db, "site", "institucional"),
        { fachadaUrl: url },
        { merge: true }
      );

      setFachadaUrl(url);
      setFile(null);
    } catch (error) {
      console.error("Erro ao atualizar fachada:", error);
      alert("Erro ao atualizar fachada.");
    } finally {
      setLoadingFachada(false);
    }
  }

  if (!user) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
        <p className="text-gray-500">Carregando perfil...</p>
      </div>
    );
  }

  const showServerImage = !file && fachadaUrl;

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

      {/* Card Perfil */}
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

      {/* ================= FACHADA ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🏪 Fachada do Restaurante
        </h2>

        <div className="space-y-4">
          {/* imagem atual do servidor */}
          {showServerImage && (
            <div className="w-full h-48 rounded-xl border overflow-hidden bg-gray-100">
              <img
                src={fachadaUrl!}
                alt="Fachada atual"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* uploader inteligente */}
          <ImageUploader
            onSelect={(selectedFile) => setFile(selectedFile)}
            onRemove={() => setFile(null)}
          />

          {/* botão */}
          <button
            onClick={handleUploadFachada}
            disabled={!file || loadingFachada}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300
            text-white px-5 py-2.5 rounded-xl font-semibold
            transition-all duration-300"
          >
            {loadingFachada ? "Enviando..." : "Atualizar Fachada"}
          </button>
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