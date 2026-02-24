import { Title } from "../components/Title";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="bg-gradient-to-b from-red-700 via-red-800 to-black py-20 px-4 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <Title
          title="Fale Conosco"
          subtitle="Entre em contato com o ITA Sushi Bar"
          center
        />

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          {/* FORMULÁRIO */}
          <form className="space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:border-red-400"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full p-3 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-gray-300 focus:outline-none focus:border-red-400"
            />
            <textarea
              placeholder="Sua mensagem"
              className="w-full p-3 rounded-xl border border-red-500/30 bg-black/40 text-white placeholder-gray-300 h-32 focus:outline-none focus:border-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold tracking-wide transition"
            >
              Enviar Mensagem
            </button>
          </form>

          {/* INFO + MAPA */}
          <div className="space-y-6">
            <div className="space-y-2 text-gray-200">
              <p><strong className="text-white">Telefone:</strong> (75) 99984-3434</p>
              <p><strong className="text-white">Email:</strong> itasushibar@gmail.com</p>
              <p>
                <strong className="text-white">Endereço:</strong>  
                Centro, Ribeira do Pombal - BA
              </p>
              <p className="text-sm text-gray-300">
                Atendimento de segunda a domingo, das 18h às 23h.
              </p>
            </div>

            {/* MAPA */}
            <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-red-500/30">
              <iframe
                src="https://www.google.com/maps?q=Ribeira%20do%20Pombal%20BA&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}