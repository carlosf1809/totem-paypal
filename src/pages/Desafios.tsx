import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ShoppingCartIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const opcoes = [
  {
    texto: "Clientes abandonam o carrinho",
    icone: <ShoppingCartIcon className="w-6 h-6" />,
  },
  {
    texto: "Checkout muito demorado",
    icone: <ClockIcon className="w-6 h-6" />,
  },
  {
    texto: "Não aceito Pix",
    icone: <CurrencyDollarIcon className="w-6 h-6" />,
  },
  {
    texto: "Não tenho meios de pagamento confiáveis",
    icone: <ShieldExclamationIcon className="w-6 h-6" />,
  },
  {
    texto: "Recebo pedidos pelo WhatsApp, mas não tenho link",
    icone: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
  },
];

export default function Desafios() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleOpcao = (texto: string) => {
    console.log(texto)
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
      <h2 className="text-3xl font-bold">
        Quem são os vilões do seu negócio?
      </h2>
      <p className="text-md text-white">(Você pode escolher até 3)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        {opcoes.map((opcao) => (
          <div
            key={opcao.texto}
            onClick={() => toggleOpcao(opcao.texto)}
            className={`flex items-center text-black gap-4 p-5 rounded-xl cursor-pointer transition shadow-[0_35px_35px_10px_rgba(0,0,0,0.2)] 
              ${
                selecionados.includes(opcao.texto)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-blue-50"
              }`}
          >
            <div className="shrink-0">{opcao.icone}</div>
            <p className="text-left font-medium">{opcao.texto}</p>
          </div>
        ))}
      </div>

      <button
        disabled={selecionados.length === 0}
        onClick={continuar}
        className={`mt-6 px-6 py-3 rounded-xl text-white text-lg font-semibold transition ${
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
