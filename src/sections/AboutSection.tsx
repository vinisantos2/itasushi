import { Title } from "../components/Title";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative py-24 px-4 overflow-hidden
      bg-gray-50"
    >
      {/* glow vermelho da marca */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-red-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* 📸 Imagem */}
        <div className="relative group">
          <img
            src="/images/site/fachada.avif"
            alt="Ita Sushi Bar"
            className="w-full h-[320px] md:h-[420px] object-cover rounded-2xl shadow-2xl
            transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* overlay escuro para dar clima */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* borda vermelha da marca */}
          <div className="pointer-events-none absolute -inset-1 rounded-2xl
            bg-gradient-to-r from-red-600/40 to-transparent
            blur-md opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* 📝 Texto */}
        <div
          className="rounded-2xl p-8 shadow-xl border
          bg-white 
          border-gray-200"
        >
          <Title
            title="Sobre o Ita Sushi Bar"
            subtitle="Tradição japonesa com sabor e qualidade"
          />

          <p className="text-gray-800 text-lg leading-relaxed mt-6 text-justify">
            O Ita Sushi Bar nasceu da paixão pela culinária japonesa e pelo
            desejo de oferecer uma experiência única em cada prato. Trabalhamos
            com ingredientes frescos, cortes precisos e muito cuidado em cada
            detalhe. Nosso ambiente foi pensado para ser acolhedor e moderno,
            perfeito para quem busca sabor autêntico, qualidade e um atendimento
            de excelência.
          </p>

          {/* 🔴 destaque da marca */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-12 h-[3px] bg-red-600 rounded-full" />
            <span className="text-sm font-bold tracking-widest text-red-600">
              QUALIDADE • TRADIÇÃO • SABOR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}