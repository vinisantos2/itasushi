"use client";

import { useState } from "react";
import Loading from "@/src/componentsAdmin/Loading";
import { useAuthRedirectAdmin } from "@/src/hoohsAdmin/useAuthRedirectAdmin";
import { uploadFileToFirebase } from "@/src/firebase/uploadImage";
import { addCardapio } from "@/src/services/cardapioService";
import { DADOS_CARDAPIO } from "@/src/data/JsonCardapio";

export default function ImportarCardapio() {
  const { loading } = useAuthRedirectAdmin();

  const [importando, setImportando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  if (loading) return <Loading />;

  async function importarCardapioEmLote() {
    if (importando) return;

    setImportando(true);
    setLogs([]);
    setProgresso(0);

    try {
      for (let i = 0; i < DADOS_CARDAPIO.length; i++) {
        const item = DADOS_CARDAPIO[i];

        try {
          let imageUrl = "";

          // ✅ upload da imagem se existir
          if (item.imagePath) {
            const response = await fetch(item.imagePath);
            const blob = await response.blob();

            const file = new File([blob], `${item.title}.png`, {
              type: blob.type,
            });

            imageUrl = await uploadFileToFirebase(file);
          }

          // ✅ salva no firestore
          await addCardapio({
            ...item,
            imageUrl,
          });

          setLogs((prev) => [...prev, `✅ ${item.title} importado`]);
        } catch (err) {
          console.error(err);
          setLogs((prev) => [...prev, `❌ Erro em ${item.title}`]);
        }

        // ✅ atualiza progresso
        const pct = Math.round(((i + 1) / DADOS_CARDAPIO.length) * 100);
        setProgresso(pct);
      }

      setLogs((prev) => [...prev, "🎉 Importação finalizada"]);
    } catch (err) {
      console.error(err);
      setLogs((prev) => [...prev, "❌ Erro geral na importação"]);
    } finally {
      setImportando(false);
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Importar Cardápio em Lote</h1>

      <button
        onClick={importarCardapioEmLote}
        disabled={importando}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl"
      >
        {importando ? "Importando..." : "Importar tudo"}
      </button>

      {/* ✅ barra de progresso */}
      {importando && (
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
      )}

      {/* ✅ logs */}
      <div className="bg-gray-100 rounded-xl p-4 max-h-60 overflow-auto text-sm">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}