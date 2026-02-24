const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white py-12 px-6 border-t border-red-500/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">

        {/* 🔴 Área do Restaurante */}
        <div className="md:w-1/2">
          <h4 className="text-2xl font-extrabold mb-5 text-white tracking-tight">
            ITA <span className="text-red-200">Sushi Bar</span>
          </h4>

          <ul className="space-y-2 text-sm">
            <li className="text-red-100">
              <strong className="text-white">Telefone:</strong>{" "}
              <a
                href="tel:+5575999843434"
                className="hover:text-white transition font-medium"
              >
                (75) 99984-3434
              </a>
            </li>

            <li className="text-red-100">
              <strong className="text-white">WhatsApp:</strong>{" "}
              <a
                href="https://wa.me/5575999843434?text=Olá,%20vim%20pelo%20cardápio!"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition font-semibold"
              >
                Pedir pelo WhatsApp
              </a>
            </li>

            <li className="text-red-100">
              <strong className="text-white">Instagram:</strong>{" "}
              <span className="text-red-200">@itasushii</span>
            </li>

            <li className="text-red-200">
              Atendimento de segunda a domingo.
            </li>
          </ul>
        </div>

        {/* 💻 Área do Desenvolvedor */}
        <div className="md:w-1/2 text-center md:text-right">
          <p className="mb-4 text-xs text-red-200 uppercase tracking-wider">
            Desenvolvido por Vinícius Santos
          </p>

          <ul className="flex md:justify-end justify-center flex-wrap gap-5 text-sm font-medium">
            <li>
              <a
                href="https://github.com/vinisantos2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-100 hover:text-white transition"
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                href="https://vs-webeapps.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-100 hover:text-white transition"
              >
                Portfólio
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/5575999913645?text=Olá,%20gostaria%20de%20um%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-100 hover:text-green-300 transition"
              >
                Criar meu site
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔻 linha inferior */}
      <div className="mt-10 pt-6 border-t border-red-500/30 text-center text-xs text-red-200">
        © {new Date().getFullYear()} ITA Sushi Bar — Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;