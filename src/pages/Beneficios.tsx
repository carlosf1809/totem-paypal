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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <h2 className="text-2xl font-bold">O que você ganha com o PayPal?</h2>

      {mostrarMais ? (
        <ul className="text-left space-y-2 max-w-md">
          {beneficios.map((b) => (
            <li key={b} className="border p-3 rounded-lg bg-blue-50">
              ✅ {b}
            </li>
          ))}
        </ul>
      ) : (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          onClick={() => setMostrarMais(true)}
        >
          Ver mais detalhes
        </button>
      )}

      {mostrarMais && (
        <button
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          onClick={() => navigate("/acao")}
        >
          Próximo passo
        </button>
      )}
    </div>
  );
}
