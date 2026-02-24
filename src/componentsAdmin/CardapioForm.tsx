import React, { useState } from "react";
import { CardapioProduto } from "@/src/types/cardapio";
import ImageUploader from "./ImageUploader";
import {
  deleteImageFromFirebase,
  uploadFileToFirebase,
} from "../firebase/uploadImage";

type Props = {
  card: CardapioProduto;
  onChange: (card: CardapioProduto) => void;
  onSubmit: (card: CardapioProduto) => void;
  buttonLabel: string;
};

export default function CardapioForm({
  card,
  onChange,
  onSubmit,
  buttonLabel,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    setSending(true);
    try {
      let imageUrl = card.imageUrl;

      if (selectedFile) {
        if (card.imageUrl) {
          await deleteImageFromFirebase(card.imageUrl);
        }
        imageUrl = await uploadFileToFirebase(selectedFile);
      }

      await onSubmit({ ...card, imageUrl });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-xl mx-auto">
      {/* 🔹 Tópico */}
      <Field label="Tópico">
        <input
          type="text"
          placeholder="Ex: Entradas, Temaki..."
          className={inputStyle}
          value={card.topico}
          onChange={(e) => onChange({ ...card, topico: e.target.value })}
        />
      </Field>

      {/* 🔹 Título */}
      <Field label="Título">
        <input
          type="text"
          placeholder="Ex: Misto, Hot..."
          className={inputStyle}
          value={card.title}
          onChange={(e) => onChange({ ...card, title: e.target.value })}
        />
      </Field>

      {/* 🔹 Descrição */}
      <Field label="Descrição">
        <input
          type="text"
          placeholder="Detalhes do cardápio "
          className={inputStyle}
          value={card.description}
          onChange={(e) =>
            onChange({ ...card, description: e.target.value })
          }
        />
      </Field>

      {/* 🔹 Valor */}
      <Field label="Valor (R$)">
        <input
          type="number"
          step="0.01"
          placeholder="Ex: 9.90"
          className={inputStyle}
          value={card.valor}
          onChange={(e) =>
            onChange({ ...card, valor: parseFloat(e.target.value || "0") })
          }
        />
      </Field>

      {/* 🔹 Disponível */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <span className="text-sm font-medium text-gray-700">
          Disponibilidade
        </span>

        <button
          type="button"
          onClick={() =>
            onChange({ ...card, disponivel: !card.disponivel })
          }
          className={`relative w-12 h-6 rounded-full transition ${
            card.disponivel ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
              card.disponivel ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* 🔹 Upload */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Imagem do prato
        </label>

        <ImageUploader onSelect={(file) => setSelectedFile(file)} />

        {card.imageUrl && (
          <img
            src={card.imageUrl}
            alt="Imagem existente"
            className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
          />
        )}
      </div>

      {/* 🔴 Botão */}
      <button
        onClick={handleSubmit}
        disabled={sending}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60
        text-white px-4 py-3 rounded-xl font-semibold
        transition-all duration-300 shadow-md shadow-red-600/20"
      >
        {sending ? "Salvando..." : buttonLabel}
      </button>
    </div>
  );
}

/* ================= helpers ================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 " +
  "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 " +
  "transition text-gray-800 placeholder-gray-400 bg-white";