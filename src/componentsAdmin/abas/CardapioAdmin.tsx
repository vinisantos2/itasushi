import { CardapioProduto } from "@/src/types/cardapio";
import { useEffect, useState } from "react";
import CardViewCardapioAdm from "../CardViewCardapioAdm";
import { useRouter } from "next/navigation";
import {
  deleteCardapio,
  getCardapioOnce,
} from "@/src/services/cardapioService";
import Loading from "../Loading";

// src/componentsAdmin/Abas/CardapioAdmin.tsx
export default function CardapioAdmin() {
  const [cards, setCards] = useState<CardapioProduto[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardapioProduto[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  function handleSearch(term: string) {
    setSearch(term);
    const lower = term.toLowerCase();
    const filtered = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(lower) ||
        card.topico.toLowerCase().includes(lower),
    );
    setFilteredCards(filtered);
  }

  function edit(id: string) {
    router.push(`/admin/editCardapio/${id}`);
  }

  async function fetchData() {
    const data = await getCardapioOnce();
    setCards(data);
    setFilteredCards(data);
    setLoading(false);
  }

  async function deleted(id: string) {
    const confirmar = confirm("Tem certeza que deseja excluir este cardápio?");
    if (!confirmar) return;

    await deleteCardapio(id);
    await fetchData(); // Atualiza lista após exclusão
  }

  if (loading) return <Loading />;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          🍣 Cardápio
        </h1>

        <button
          onClick={() => router.push("/admin/novoCardapio")}
          className="bg-red-600 hover:bg-red-700 text-white 
        px-5 py-2.5 rounded-xl font-semibold 
        transition-all duration-300 shadow-md 
        shadow-red-600/20 hover:scale-[1.02]"
          aria-label="Adicionar novo cardápio"
        >
          + Novo Cardápio
        </button>
      </div>

      {/* Barra de busca */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por título ou tópico..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3
        focus:ring-2 focus:ring-red-500 focus:border-red-500
        outline-none transition text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Lista */}
      <main className="space-y-5">
        {filteredCards.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500">Nenhum cardápio encontrado.</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <CardViewCardapioAdm
              key={card.id}
              card={card}
              edit={() => edit(card.id!)}
              deleted={() => deleted(card.id!)}
            />
          ))
        )}
      </main>
    </section>
  );
}
