import { useNavigate } from "react-router-dom";
import Fundo from "../assets/fundo-paypal.png";

export default function BoasVindas() {
  const navigate = useNavigate();

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${Fundo})` }}
  >
      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
        {/* Texto à esquerda */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
            Imagine sua próxima<br />venda... <br />sem barreiras.
          </h1>
          <p className="text-gray-700 text-lg max-w-md">
            Pronto para virar o herói da sua própria história?
          </p>
          <button
            onClick={() => navigate("/perfil")}
            className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition"
          >
            Vamos começar sua jornada
          </button>
        </div>

        {/* Logo centralizada na faixa azul */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal logo"
            className="w-48 md:w-60 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
