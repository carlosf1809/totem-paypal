import { useNavigate } from "react-router-dom";
import { useState } from "react";

const beneficios = [
  "Mais conversão",
  "Checkout rápido",
  "Pix e carteiras digitais",
  "Segurança antifraude",
  "Adquirência própria no Brasil",
];

export default function Beneficios() {
  const navigate = useNavigate();
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center gap-8">
      <h2 className="text-4xl font-bold leading-snug max-w-2xl">
        O que você ganha com o PayPal?
      </h2>

      {!mostrarMais ? (
        <button
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          onClick={() => setMostrarMais(true)}
        >
          Ver mais detalhes
        </button>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-3xl">
            {beneficios.map((b) => (
              <li
                key={b}
                className="bg-blue-50 border text-black border-blue-200 rounded-xl px-6 py-4 font-medium shadow-2xl"
              >
                ✅ {b}
              </li>
            ))}
          </ul>

          <button
            className="mt-6 bg-green-600  px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
            onClick={() => navigate("/acao")}
          >
            Próximo passo
          </button>
        </>
      )}
    </div>
  );
}
