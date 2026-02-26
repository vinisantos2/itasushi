import { CardapioProduto } from "../types/cardapio"
import { ImageOff } from "lucide-react"

export default function CardViewCardapioAdm({
  card,
  edit,
  deleted,
}: {
  card: CardapioProduto
  edit: () => void
  deleted: () => void
}) {
  const hasImage = !!card.imageUrl

  return (
    <li
      className="
        bg-white
        border border-red-100
        rounded-xl
        p-4
        mb-4
        flex flex-col md:flex-row items-center
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      {/* 🖼️ Imagem */}
      <div className="w-32 h-20 mr-0 md:mr-4 mb-3 md:mb-0 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        {hasImage ? (
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageOff size={28} />
            <span className="text-xs">Sem imagem</span>
          </div>
        )}
      </div>

      {/* 📄 Conteúdo */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-semibold text-gray-900 text-lg">
          {card.title}
        </h3>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {card.description}
        </p>

        <p className="text-red-600 font-bold mt-2">
          R$ {card.valor.toFixed(2)}
        </p>
      </div>

      {/* 🎯 Ações */}
      <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
        <button
          onClick={edit}
          className="
            bg-yellow-400
            text-gray-900
            px-3 py-1.5
            rounded-lg
            font-medium
            hover:bg-yellow-500
            transition
          "
        >
          Editar
        </button>

        <button
          onClick={deleted}
          className="
            bg-red-600
            text-white
            px-3 py-1.5
            rounded-lg
            font-medium
            hover:bg-red-700
            transition
          "
        >
          Excluir
        </button>
      </div>
    </li>
  )
}