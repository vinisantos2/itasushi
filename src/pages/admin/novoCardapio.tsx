import { CardapioProduto } from "@/src/types/cardapio";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthRedirectAdmin } from "../../hoohsAdmin/useAuthRedirectAdmin";
import { addCardapio } from "@/src/services/cardapioService";
import CardapioForm from "@/src/componentsAdmin/CardapioForm";
import HeaderAdminBack from "@/src/componentsAdmin/HeaderBackAdmin";

export default function NovoCardapio() {
  const router = useRouter();
  const { usuario, loading } = useAuthRedirectAdmin();

  const [newCard, setNewCard] = useState<CardapioProduto>({
    topico: "",
    title: "",
    description: "",
    imageUrl: "",
    valor: 0,
    disponivel: true,
  });

  if (loading) return <p>Carregando...</p>;

  async function handleAddCard() {
    if (!newCard.title || !newCard.valor) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      await addCardapio(newCard);
      alert("Cardápio adicionado com sucesso!");
      router.push("/admin");
    } catch (error) {
      console.error("Erro ao adicionar cardápio:", error);
      alert("Erro ao adicionar cardápio.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdminBack />

      <main className="max-w-2xl mx-auto px-4 py-8 mt-4">
        {/* Card container */}
        <div className="bg-red-100 border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          {/* Título */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              🍣 Adicionar Cardápio
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Preencha as informações do novo item do menu.
            </p>
          </div>

          {/* Form */}
          <CardapioForm
            card={newCard}
            onChange={setNewCard}
            onSubmit={handleAddCard}
            buttonLabel="Adicionar cardápio"
          />
        </div>
      </main>
    </div>
  );
}
