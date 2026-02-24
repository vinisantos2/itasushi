export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100"
    >
      {/* 🖼️ IMAGEM DE FUNDO */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/fundo/background.avif" // 🔥 troque pela sua imagem
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🌫️ OVERLAY para melhorar contraste */}
      <div className="absolute inset-0 bg-white/40 z-0" />

    

      {/* 🔴 Círculo vermelho com perda de cor */}
      <div className="absolute z-10">
        <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-r from-red-700 via-red-600 to-transparent blur-[1px]" />
      </div>

      {/* 🍣 Imagem decorativa (hashi) */}
      <img
        src="/images/site/hashi.avif"
        alt="Hashi"
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 w-48 md:w-72 rotate-12 z-20 opacity-90"
      />

      {/* 📦 Conteúdo */}
      <div className="relative z-30 text-center px-4">
        <span className="block text-gray-900 font-extrabold tracking-widest text-4xl md:text-6xl mb-6">
          CARDÁPIO
        </span>

        <h1 className="text-gray-900 text-4xl md:text-6xl font-bold drop-shadow-lg">
          Ita Sushi Bar
        </h1>

        <a
          href="/cardapio"
          className="inline-block mt-8 bg-black hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          Ver Cardápio
        </a>
      </div>

      {/* ✨ Fade suave geral */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30 z-20" />
    </section>
  );
}