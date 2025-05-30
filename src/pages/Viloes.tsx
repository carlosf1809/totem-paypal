// src/pages/ViloesLimite.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useJornada } from "../context/JornadaContext";

const VILOES = [
  "Clientes abandonam o carrinho.",
  "Checkout muito demorado.",
  "Limitações para escalar globalmente.",
  "Não tenho meios de pagamento confiáveis",
  "Recebo pedidos pelas redes sociais, mas não tenho como cobrar.",
  "Fraudes e chargebacks.",
];

export default function ViloesLimite() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelecionados((curr) =>
      curr.includes(item)
        ? curr.filter((x) => x !== item)
        : curr.length < 3
        ? [...curr, item]
        : curr
    );
  };

  const proximo = () => {
    // salva no contexto e vai pra próxima tela
    atualizar({ desafios: selecionados });
    navigate("/solucao");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 py-10 text-white text-center">
      {/* Título */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Quem são os vilões do seu negócio?
      </motion.h2>

      {/* Lista de vilões */}
      <div className="flex flex-col gap-6 w-full max-w-xl">
        {VILOES.map((texto, i) => {
          const ativo = selecionados.includes(texto);
          return (
            <motion.button
              key={texto}
              onClick={() => toggle(texto)}
              className={`
                flex items-start gap-4 p-4 transition-all duration-200
                ${ativo
                  ? "bg-transparent text-white"
                  : "bg-transparent text-white hover:bg-white/10"}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Checkbox */}
              <div
                className={`
                  w-6 h-6 flex-shrink-0 rounded border-2
                  ${ativo ? "border-white" : "border-[#0070E0]"}
                `}
              >
                {ativo && (
                  <svg
                    className="w-4 h-4 text-white m-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-left text-lg leading-snug">{texto}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Botão Avançar com pulso */}
      <motion.button
        onClick={proximo}
        disabled={selecionados.length === 0}
        className={`
          mt-12 px-10 py-4 rounded-lg font-semibold text-lg transition-all
          ${selecionados.length
            ? "bg-[#0070E0] text-white hover:bg-[#0059b2] cursor-pointer"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"}
        `}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          selecionados.length
            ? { opacity: 1, scale: [1, 1.05, 1] }  // pulso contínuo
            : { opacity: 0.6, scale: 1 }
        }
        transition={{
          delay: 0.8,
          duration: selecionados.length ? 1.5 : 0.4,
          repeat: selecionados.length ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        Avançar
      </motion.button>
    </div>
  );
}
