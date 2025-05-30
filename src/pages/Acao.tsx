// src/pages/Acao.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import TecladoVirtual from "../components/TecladoVirtual";

export default function Acao() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  const [mostrarEmailInput, setMostrarEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const enviarEmail = () => {
    if (!email.includes("@")) {
      alert("Digite um e-mail válido.");
      return;
    }
    atualizar({ email });
    navigate("/fim");
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Conteúdo rolável */}
      <div className="flex-1 flex-col overflow-auto py-12 px-24">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-8 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Queremos ser seu companheiro de jornada
        </motion.h2>

        <motion.div
          className="flex flex-col gap-6 w-full"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.button
            variants={item}
            onClick={() => navigate("/fim")}
            className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
          >
            Quero conversar com um especialista
          </motion.button>

          <motion.button
            variants={item}
            onClick={() => setMostrarEmailInput(true)}
            className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
          >
            Enviar detalhes por e-mail
          </motion.button>

          {mostrarEmailInput && (
            <motion.div
              className="mt-2 flex flex-col gap-2"
              variants={item}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full max-w-sm px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={enviarEmail}
                className="self-start bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-max"
              >
                Enviar
              </button>
            </motion.div>
          )}

          <motion.button
            variants={item}
            onClick={() => navigate("/mais-informacoes")}
            className="bg-[#0070E0] text-white text-lg font-semibold px-8 py-5 rounded-lg shadow-md hover:bg-[#0059b2] transition w-max text-left"
          >
            Escanear QR Code e saber mais
          </motion.button>
        </motion.div>
      </div>

      {/* Teclado virtual: só aparece quando mostrarEmailInput === true */}
      {mostrarEmailInput && (
        <div className="absolute bottom-0 left-0 w-full">
          <TecladoVirtual
            onInput={(v) => setEmail((prev) => prev + v)}
            onBackspace={() => setEmail((prev) => prev.slice(0, -1))}
          />
        </div>
      )}
    </div>
  );
}
