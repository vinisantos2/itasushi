"use client";

import { CardapioProduto } from "@/src/types/cardapio";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addCardapio,
  getCardapioById,
  updateCardapio,
} from "@/src/services/cardapioService";
import CardapioForm from "@/src/componentsAdmin/CardapioForm";
import HeaderAdmin from "@/src/componentsAdmin/HeaderAdmin";
import { auth } from "@/src/firebase/firebaseConfig";
import { useAuthRedirectAdmin } from "@/src/hoohsAdmin/useAuthRedirectAdmin";

export default function PageFormCardapio() {
  const router = useRouter();
  const { loading } = useAuthRedirectAdmin();

  // ✅ pega id da rota dinâmica com tipagem segura
  const { id } = router.query;

  const idString =
    typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;

  const isEdit = !!idString;

  const [loadingData, setLoadingData] = useState(false);

  const [newCard, setNewCard] = useState<CardapioProduto>({
    topico: "",
    title: "",
    description: "",
    imageUrl: "",
    valor: 0,
    disponivel: true,
  });

  // 🔥 carregar dados se for edição
  useEffect(() => {
    if (!idString) return;

    async function fetchData() {
      try {
        setLoadingData(true);

        const data = await getCardapioById(idString);

        // ✅ fallback se não existir
        if (!data) {
          alert("Item não encontrado.");
          router.push("/admin");
          return;
        }

        setNewCard(data);
      } catch (err) {
        console.error("Erro ao buscar cardápio:", err);
        alert("Erro ao carregar item.");
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [idString, router]);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  // ✅ salvar (add ou edit)
  async function handleSaveCard(cardData: CardapioProduto) {
    if (!cardData.title || !cardData.valor) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      if (isEdit && idString) {
        await updateCardapio(idString, cardData);
        alert("Cardápio atualizado com sucesso!");
      } else {
        await addCardapio(cardData);
        alert("Cardápio adicionado com sucesso!");
      }

      router.push("/admin");
    } catch (error) {
      console.error("Erro ao salvar cardápio:", error);
      alert("Erro ao salvar cardápio.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin
        userName={auth.currentUser?.email || ""}
        onLogout={() => {
          auth.signOut();
          router.push("/admin/login");
        }}
      />

      <main className="max-w-2xl mx-auto px-4 py-8 mt-4">
        <div className="bg-red-100 border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isEdit ? "✏️ Editar Cardápio" : "🍣 Adicionar Cardápio"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Atualize as informações do item."
                : "Preencha as informações do novo item do menu."}
            </p>
          </div>

          <CardapioForm
            card={newCard}
            onChange={setNewCard}
            onSubmit={handleSaveCard}
            buttonLabel={isEdit ? "Salvar alterações" : "Adicionar cardápio"}
          />
        </div>
      </main>
    </div>
  );
}
