// src/pages/MaisSuperpoderes.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import IconTrophy from "../assets/icon-trophy.png"; // ícone de troféu
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function MaisSuperpoderes() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/fim");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const poderesPP = [
    "Processamento local em cartão e outros.",
    "Remessas domésticas e internacionais.",
    "Mais ferramentas de otimização.",
  ];

  const poderesBT = [
    "Suporte global com múltiplas moedas.",
    "Processamento otimizado.",
    "Proteção contra fraudes avançadas.",
  ];

  return (
    <div className="w-full h-screen flex items-center justify-start p-24 overflow-auto">
      <div className="max-w-3xl w-full space-y-10">
        {/* Título */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mais superpoderes para você!
        </motion.h2>

        {/* Primeiro CTA */}
        <motion.button
          onClick={() => {/* navigate("/acao-ppcp") */}}
          className="bg-[#0070E0] px-10 py-5 rounded-lg text-xl font-semibold text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          Adquirência própria no Brasil
        </motion.button>

        {/* Lista de poderes PPCP */}
        <motion.ul
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {poderesPP.map((texto, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-4 text-xl text-white"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <CheckCircle className="text-[#0070E0] w-7 h-7 flex-shrink-0" />
              {texto}
            </motion.li>
          ))}
        </motion.ul>

        {/* Segundo CTA */}
        <motion.button
          className="bg-[#0070E0] px-10 py-5 rounded-lg text-xl font-semibold text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          Conheça o Braintree
        </motion.button>

        {/* Lista de poderes Braintree */}
        <motion.ul
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 1.0 } }
          }}
        >
          {poderesBT.map((texto, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-4 text-xl text-white"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <CheckCircle className="text-[#0070E0] w-7 h-7 flex-shrink-0" />
              {texto}
            </motion.li>
          ))}
        </motion.ul>

        {/* Ícone de troféu */}
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {/* <img src={IconTrophy} alt="Troféu" className="w-20 h-20" /> */}
        </motion.div>
      </div>
    </div>
  );
}
