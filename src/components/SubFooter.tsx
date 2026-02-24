const SubFooter = () => {
  return (
    <div className="bg-gray-900 text-gray-400 text-xs py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        
        <p>
          © {new Date().getFullYear()} ITA Sushi Bar. Todos os direitos reservados.
        </p>

        <p>
          Produzido por{" "}
          <a
            href="https://vs-webeapps.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition-colors"
          >
            VS Web & Apps
          </a>
        </p>

      </div>
    </div>
  );
};

export default SubFooter;