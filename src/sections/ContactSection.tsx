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
              <p>
                <strong className="text-white">Telefone:</strong> (75)
                99984-3434
              </p>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                itasushibar@gmail.com
              </p>
              <p>
                <strong className="text-white">Endereço: </strong>
                Rua da palmeira Nº 115, Centro, Itaberaba - BA
              </p>
              <p className="text-sm text-gray-300">
                Atendimento de segunda a domingo, das 18h às 23h.
              </p>
            </div>

            {/* MAPA */}
            <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-red-500/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1947.3663076576233!2d-40.305760461540096!3d-12.533864378646811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDMyJzAxLjkiUyA0MMKwMTgnMTYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1772295600907!5m2!1spt-BR!2sbr"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}