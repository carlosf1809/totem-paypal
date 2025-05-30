import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-paypal.png";
import { motion } from "framer-motion";
import TextoAnimado from "../components/TextoAnimado";
import IconeCartao from "../assets/icon-cartao.png"; // substitua se tiver um SVG/PNG real

export default function BoasVindasTotem() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<0 | 1 | 2>(0);
  const [chaveAnimacao, setChaveAnimacao] = useState(0);

  // useEffect(() => {
  //   if (etapa === 2) {
  //     const timer = setTimeout(() => {
  //       setEtapa(0);
  //       setChaveAnimacao((prev) => prev + 1);
  //     }, 6000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [etapa]);

  return (
    <div className="w-screen h-screen bg-white text-[#003087] flex flex-col items-center justify-center px-6 py-10 text-center">
      {/* LOGO */}
      <motion.img
        src={Logo}
        alt="Logo PayPal"
        className="w-96 h-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* TÍTULO */}
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-[#0070E0] mb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Boas-vindas
      </motion.h2>

      {/* BLOCO DE TEXTO COM ANIMAÇÃO */}
      <motion.div
        className="bg-[#f2f4f7] rounded-3xl px-2 py-22 w-full max-w-3xl text-5xl text-[#1a1a1a] font-bold space-y-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <TextoAnimado
          key={`linha1-${chaveAnimacao}`}
          texto="Imagine sua próxima venda... "
          delayBase={0}
          onFinish={() => setEtapa(1)}
        />

        {etapa >= 1 && (
          <TextoAnimado
            key={`linha2-${chaveAnimacao}`}
            texto="sem barreiras e sem fronteiras."
            delayBase={0.3}
            onFinish={() => setEtapa(2)}
            className="text-[#0070E0] "
          />
        )}

        {etapa >= 2 && (
          <TextoAnimado
            key={`linha3-${chaveAnimacao}`}
            texto="Quer vender mais e facilitar a vida dos seus clientes?"
            delayBase={0.4}
          />
        )}
      </motion.div>

      {/* ÍCONE opcional */}
      <motion.div
        className="mb-16 -mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <img src={IconeCartao} alt="Ícone" className="w-20 h-20" />
        {/* <div className="w-16 h-16 bg-blue-500 rounded-full" /> Placeholder visual */}
      </motion.div>

      {/* BOTÃO */}
      {etapa >= 2 && (
        <motion.button
          onClick={() => navigate("/perfil")}
          className="bg-[#0070E0] text-white text-lg md:text-xl px-14 py-6 rounded-xl font-semibold shadow-lg hover:bg-[#0059b2] transition-all"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1], // pulsando levemente
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          Vamos começar sua jornada
        </motion.button>
      )}
    </div>
  );
}
