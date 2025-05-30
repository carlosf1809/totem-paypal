// src/pages/Solucao.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Solucao() {
  const { dados } = useJornada();
  const navigate = useNavigate();

  const isAna = dados.perfil === "ana";
  const buttonLabel = isAna
    ? "PayPal Complete Payments"
    : "PayPal Braintree";

  // Ajuste a rota de destino conforme seu fluxo
  const handleClick = () =>
    navigate(isAna ? "/jornada-ppcp" : "/jornada-braintree");

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center text-center p-8">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-3xl md:text-4xl font-bold text-[#0070E0] mb-4">
          Sua empresa está pronta para o futuro?
        </p>
        <p className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
          Descubra a solução ideal para o seu negócio:
        </p>
      </motion.div>

      {/* Botão condicional */}
      <motion.button
        onClick={handleClick}
        className="
          mt-10
          bg-[#0070E0] text-white 
          px-12 py-4 
          rounded-lg text-xl font-semibold 
          shadow-lg hover:bg-[#0059b2] 
          transition-all
        "
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        {buttonLabel}
      </motion.button>
    </div>
  );
}
