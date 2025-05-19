import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const opcoes = [
  "Clientes abandonam o carrinho",
  "Checkout muito demorado",
  "Não aceito Pix",
  "Não tenho meios de pagamento confiáveis",
  "Recebo pedidos pelo WhatsApp, mas não tenho link",
];

export default function Desafios() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleOpcao = (texto: string) => {
    if (selecionados.includes(texto)) {
      setSelecionados(selecionados.filter((d) => d !== texto));
    } else if (selecionados.length < 3) {
      setSelecionados([...selecionados, texto]);
    }
  };

  const continuar = () => {
    atualizar({ desafios: selecionados });
    navigate("/jornada");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <h2 className="text-2xl font-bold">Quem são os vilões do seu negócio?</h2>
      <p className="text-sm text-gray-400">(Você pode escolher até 3)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        {opcoes.map((opcao) => (
          <div
            key={opcao}
            onClick={() => toggleOpcao(opcao)}
            className={`border rounded-xl p-4 cursor-pointer transition ${
              selecionados.includes(opcao)
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-blue-100"
            }`}
          >
            {opcao}
          </div>
        ))}
      </div>

      <button
        disabled={selecionados.length === 0}
        onClick={continuar}
        className={`px-6 py-3 rounded-xl text-white text-lg transition ${
          selecionados.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Continuar
      </button>
    </div>
  );
}
