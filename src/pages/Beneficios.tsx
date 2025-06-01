// src/pages/MaisSuperpoderes.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useJornada } from "../context/JornadaContext";
import IconeTrofeu from "../assets/trofeu.png";

export default function MaisSuperpoderes() {
  const navigate = useNavigate();
  const { dados } = useJornada();
  const perfil = dados.perfil; // pode ser "leo" | "ana" | null

  // Listas de "superpoderes"
  const poderesPPCP = [
    "Mais conversão",
    "Checkout rápido",
    "Carteiras digitais",
    "Segurança antifraude",
    "Adquirência própria no Brasil",
  ];

  const poderesBraintree = [
    "Adquirência própria",
    "Tokenização com as Bandeiras (NT) + Pass Through",
    "Parcelamento em até 12 vezes",
    "Antecipação de recebíveis*",
    "Débito sem uso de PIN",
    "3DS 2.0 e Data Only",
    "Account updater",
    "Carta de circularização",
    "Proteção contra chargebacks*",
    "Filtros de risco robustos",
    "Painel de controle global",
    "Carteiras Digitais (PayPal, Apple Pay, Google Pay)",
  ];

  // Framer-Motion: variantes
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-auto py-12">
      <div className="max-w-3xl w-full px-8">
        {/* Título */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white text-left mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Altera o título conforme perfil */}
          {perfil === "grandes"
            ? "Mais superpoderes para você!"
            : "O que você ganha com as soluções de pagamento do PayPal"}
        </motion.h2>

        {/*
          Se perfil === "ana" (grandes empresas):
            mostramos os superpoderes do Braintree e botao de avançar
          Senão (perfil === "leo" ou null), mostramos o pacote PPCP
        */}
        {perfil === "grandes" ? (
          // === BLOCO PARA "ANA" – Grandes Empresas: Braintree ===
          <>
            {/* 1) CTA principal */}
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-white mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Conheça o PayPal Braintree:
            </motion.h3>

            {/* 2) Lista de "superpoderes" do Braintree */}
            <motion.ul
              className="space-y-10 mb-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {poderesBraintree.map((texto, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-4 text-xl text-white"
                  variants={itemVariants}
                >
                  <CheckCircle className="text-[#0070E0] w-7 h-7 flex-shrink-0" />
                  {texto}
                </motion.li>
              ))}
            </motion.ul>

            {/* 3) Ícone extra + botão "Avançar" animado */}
            <motion.div
              className="flex flex-col items-start mt-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <img src={IconeTrofeu} alt="Ícone troféu" className="w-20 h-20 mb-4" />

              
            </motion.div>
          </>
        ) : (
          // === BLOCO PARA "LEO" – Pequenas/Médias Empresas: PPCP ===
          <>
            {/* 1) CTA principal
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-white mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Ver mais detalhes:
            </motion.h3> */}

            {/* 2) Lista de "superpoderes" do PPCP */}
            <motion.ul
              className="space-y-12 mb-8 mt-16"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {poderesPPCP.map((texto, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-4 text-xl text-white"
                  variants={itemVariants}
                >
                  <CheckCircle className="text-[#0070E0] w-7 h-7 flex-shrink-0" />
                  {texto}
                </motion.li>
              ))}
            </motion.ul>

            {/* 3) Ícone extra + botão "Avançar" animado */}
            <motion.div
              className="flex flex-col items-start mt-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <img src={IconeTrofeu} alt="Ícone troféu" className="w-20 h-20 mb-4" />

            
            </motion.div>
          </>
        )}
        <motion.button
                onClick={() => navigate("/acao")}
                className="px-12 py-4 rounded-lg font-medium text-2xl bg-[#0070E0] text-white hover:bg-[#0059b2] cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                transition={{
                  delay: 2.2,
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Avançar
              </motion.button>
      </div>
    </div>
  );
}
