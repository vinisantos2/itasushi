"use client";

import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { CardViewCardapio } from "../components/CardView";
import { getCardapioOnce } from "../services/cardapioService";
import { CardapioProduto } from "../types/cardapio";

export default function Cardapio() {
  const [cards, setCards] = useState<CardapioProduto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getCardapioOnce();
      setCards(data.filter((item) => item.disponivel !== false));
    } catch (e) {
      console.error("Erro ao buscar cardápio:", e);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 agrupar por tópico (agora do Firebase)
  const cardapioPorTopico = cards.reduce(
    (acc, item) => {
      const topico = item.topico || "Outros";
      if (!acc[topico]) acc[topico] = [];
      acc[topico].push(item);
      return acc;
    },
    {} as Record<string, CardapioProduto[]>
  );

  const topicosUnicos = Object.keys(cardapioPorTopico);

  return (
    <main
      
  className="py-20 px-4 min-h-screen
  bg-gradient-to-b from-gray-50 via-white to-gray-100
  transition-colors duration-500"
>
  <div className="max-w-6xl mx-auto">
    <Title
      title="Cardápio"
      subtitle="Confira nossas deliciosas opções"
      center
    />

    {/* Loading */}
    {loading && (
      <div className="text-center text-gray-500 mt-10">
        Carregando cardápio...
      </div>
    )}

    {/* vazio */}
    {!loading && topicosUnicos.length === 0 && (
      <div className="text-center text-gray-500 mt-10">
        Nenhum item disponível no momento.
      </div>
    )}

    {/* lista */}
    {!loading &&
      topicosUnicos.map((topico) => (
        <section key={topico} id={topico} className="mt-16 scroll-mt-24">
          {/* título categoria */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-red-600 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {topico}
            </h2>
          </div>

          {/* grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cardapioPorTopico[topico].map((item) => (
              <CardViewCardapio key={item.id} produto={item} />
            ))}
          </div>
        </section>
      ))}
  </div>
</main>
  );
}