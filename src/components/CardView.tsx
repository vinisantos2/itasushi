import { CardapioProduto } from "../types/cardapio";

type Props = {
  produto: CardapioProduto;
};

export function CardViewCardapio({ produto }: Props) {
  const valorFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.valor);

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-200
      transition-all duration-300
      ${
        produto.disponivel
          ? "hover:-translate-y-1 hover:shadow-xl"
          : "opacity-60"
      }`}
    >
      {/* 🖼 Imagem ou fallback */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {produto.imageUrl ? (
          <img
            src={produto.imageUrl}
            alt={produto.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span className="text-xl font-bold">✕</span>
            </div>
            <span className="text-xs mt-2">Sem imagem</span>
          </div>
        )}

        {/* 🔴 Badge indisponível */}
        {!produto.disponivel && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="bg-white text-gray-900 text-sm font-semibold px-4 py-1.5 rounded-lg shadow">
              Indisponível
            </span>
          </div>
        )}
      </div>

      {/* 📦 Conteúdo */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
          {produto.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {produto.description}
        </p>

        {/* 💰 Preço destaque ITA */}
        <div className="mt-2">
          <span className="text-xl font-bold text-red-600">
            {valorFormatado}
          </span>
        </div>
      </div>
    </div>
  );
}