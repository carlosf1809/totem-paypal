// src/pages/LocalCliente.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useJornada, type Canal } from "../context/JornadaContext";

// Ícones em src/assets
import IconSite from "../assets/icon-site.png";
import IconRedes from "../assets/icon-redes.png";
import IconVolume from "../assets/icon-cartao.png";

export default function LocalCliente() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  // Estado tipado como Canal[]
  const [selecionados, setSelecionados] = useState<Canal[]>([]);

  const opcoes: { id: Canal; icon: string; text: string }[] = [
    {
      id: "site",
      icon: IconSite,
      text: "Tenho um site, mas vendo mais fora dele.",
    },
    {
      id: "redes",
      icon: IconRedes,
      text: "Não tenho site, meu negócio vive nas redes sociais.",
    },
    {
      id: "ecommerce",
      icon: IconVolume,
      text: "Tenho site com grande volume de vendas.",
    },
  ];

  const toggle = (id: Canal) => {
    setSelecionados((curr) =>
      curr.includes(id) ? curr.filter((c) => c !== id) : [...curr, id]
    );
  };

  const proximo = () => {
    console.log(selecionados)
    // Agora Canal[] casa corretamente com JornadaData.canal
    atualizar({ canal: selecionados });
    navigate("/viloes");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-white text-center">
      {/* Título */}
      <motion.div
        className="mb-12 w-[90%]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg md:text-4xl font-semibold text-[#6CC3FF] mb-2">
          Onde sua história acontece?
        </p>
        <h2 className="text-3xl md:text-6xl font-bold leading-snug">
          Todo herói tem seu território. <br />
          Onde seus clientes te encontram?
        </h2>
      </motion.div>

      {/* Lista de opções */}
      <div className="grid gap-6 w-full max-w-xl">
        {opcoes.map((op, i) => {
          const active = selecionados.includes(op.id);
          return (
            <motion.button
              key={op.id}
              onClick={() => toggle(op.id)}
              className={`
                flex gap-4
                rounded-2xl justify-center items-center p-6 shadow-lg cursor-pointer
                transition-all duration-300 focus:outline-none
                ${active
                  ? "bg-[#0070E0] text-white"
                  : "bg-white text-[#003087] hover:bg-gray-100"}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={op.icon} alt="" className="w-24 h-24 flex-shrink-0" />
              <span className="text-2xl text-black font-medium">{op.text}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Botão avançar */}
      <motion.button
        onClick={proximo}
        disabled={selecionados.length === 0}
        className={`
          mt-12 px-12 py-4 rounded-lg text-xl font-semibold transition-all
          ${selecionados.length
            ? "bg-white text-[#003087] hover:bg-gray-200"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"}
        `}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Avançar
      </motion.button>
    </div>
  );
}
