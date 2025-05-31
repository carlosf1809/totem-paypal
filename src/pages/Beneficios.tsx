// src/pages/MaisSuperpoderes.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useJornada } from "../context/JornadaContext";

export default function MaisSuperpoderes() {
  const navigate = useNavigate();
  const { dados } = useJornada();
  const perfil = dados.perfil; // "leo" | "ana" | null

  // Se você quiser redirecionar automaticamente para /fim após X segundos:
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/acao");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Poderes PayPal PPCP (para perfil "leo", pequenas/médias empresas)
  const poderesPPCP = [
    "Mais conversão.",
    "Checkout rápido.",
    "Carteiras digitais.",
    "Segurança antifraude.",
    "Adquirência própria no Brasil.",
  ];

  // Poderes PayPal/Braintree (para perfil "ana", grandes empresas)
  const poderesBraintree = [
    "Adquirência própria",
    "Tokenização com as Bandeiras (NT) + Pass Through",
    "Parcelamento em até 12 vezes",
    "Antecipação de recebíveis*",
    "Débito sem uso de PIN",
    "3DS 2.0 e Somente Dados",
    "Atualizador de conta",
    "Carta de circularização",
    "Proteção contra estornos*",
    "Filtros de risco robustos",
    "Painel de controle global",
    "Carteira Digital (PayPal, Apple Pay, Google Pay)",
  ];

  // Framer-Motion: variantes de container e de itens
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
    <div className="w-full h-screen flex items-start justify-center overflow-auto py-12">
      <div className="max-w-3xl w-full px-8">
        {/* === Título Geral === */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white text-left mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {perfil === "grandes" ? "Mais superpoderes para você!" : "O que você ganha com as soluções de pagamento do PayPal"}
        </motion.h2>

        {perfil === "grandes" ? (
          // === BLOCO PARA “ANA” – Grandes Empresas: PayPal/Braintree ===
          <>
            {/* 1) CTA principal */}
            <motion.button
              className="bg-[#0070E0] px-10 py-5 rounded-lg text-xl font-semibold text-left text-white mb-8 w-max"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              // onClick={() => {
              //   // Exemplo: você pode redirecionar para uma landing page de Braintree
              //   // ou apenas abrir um modal. Aqui, demonstramos navegação:
              //   navigate("/journey-braintree");
              // }}
            >
              Conheça o PayPal/Braintree:
            </motion.button>

            {/* 2) Lista de “superpoderes” do Braintree */}
            <motion.ul
              className="space-y-5 mb-12"
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

            {/* 3) Ícone extra no fim (opcional) */}
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              {/* Coloque aqui algum ícone de troféu ou imagem de final */}
              <CheckCircle className="text-white w-10 h-10" />
            </motion.div>
          </>
        ) : (
          // === BLOCO PARA “LEO” – Pequenas/Médias Empresas: PayPal PPCP ===
          <>
            {/* 1) CTA principal */}
            <motion.button
              className="bg-[#0070E0] px-10 py-5 rounded-lg text-xl font-semibold text-left text-white mb-8 w-max"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                // Exemplo: navegar para a página de “JourneyPPCP”
                navigate("/journey-ppcp");
              }}
            >
              Ver mais detalhes
            </motion.button>

            {/* 2) Lista de “superpoderes” do PPCP */}
            <motion.ul
              className="space-y-5"
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

            {/* 3) Ícone extra no fim (opcional) */}
            <motion.div
              className="flex justify-start mt-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              {/* Coloque aqui algum ícone de troféu ou imagem de final */}
              <CheckCircle className="text-white w-10 h-10" />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
