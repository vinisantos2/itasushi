// src/types/cardapio.ts
export type CardapioProduto = {
  id?: string;
  title: string;
  topico: string;
  description: string;
  imageUrl: string;
  imagePath?: string; // 👈 caminho local TEMPORÁRIO
  valor: number;
  disponivel: boolean;
};
