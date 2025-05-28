import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fundo from "../assets/fundo-paypal.png";
import Logo from "../assets/logo-paypal.png";
import { motion } from "framer-motion";
import TextoAnimado from "../components/TextoAnimado";

export default function BoasVindasTotem() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState<0 | 1 | 2>(0);
  const [chaveAnimacao, setChaveAnimacao] = useState(0); // força remount

  useEffect(() => {
    if (etapa === 2) {
      const timer = setTimeout(() => {
        setEtapa(0);              // reinicia animação
        setChaveAnimacao(prev => prev + 1); // força rerender do componente TextoAnimado
      }, 5000); // 5 segundos após a última etapa

      return () => clearTimeout(timer);
    }
  }, [etapa]);

  return (
    <div
      className="
        w-screen h-screen
        bg-no-repeat bg-cover bg-center
        flex flex-col justify-around
        items-center 
        p-16
        text-white
      "
      style={{
        backgroundPosition: "center bottom",
      }}
    >
      {/* TOPO: título animado */}
      <div className="text-center text-7xl font-bold leading-snug">
        <TextoAnimado
          key={`linha1-${chaveAnimacao}`}
          texto="Imagine sua próxima venda..."
          delayBase={0}
          onFinish={() => setEtapa(1)}
        />
        <br />
        {etapa >= 1 && (
          <TextoAnimado
            key={`linha2-${chaveAnimacao}`}
            texto="sem barreiras e sem fronteiras."
            delayBase={0.5}
            onFinish={() => setEtapa(2)}
          />
        )}

        {etapa >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl text-center font-extralight mt-10"
          >
            <TextoAnimado
              key={`subtitulo-${chaveAnimacao}`}
              texto="Pronto para virar o herói da sua própria história?"
              delayBase={0}
            />
          </motion.div>
        )}
      </div>

      {/* MEIO: logo animada */}
      {etapa >= 2 && (
        <motion.div
          key={`logo-${chaveAnimacao}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-xl"
        >
          <img src={Logo} alt="PayPal" className="w-64 h-64 object-contain" />
        </motion.div>
      )}

      {/* BOTÃO animado */}
      {etapa >= 2 && (
        <motion.button
          key={`botao-${chaveAnimacao}`}
          onClick={() => navigate("/perfil")}
          className="bg-blue-700 text-white py-4 px-12 rounded-lg font-semibold text-2xl shadow-lg"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <motion.span
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            Vamos começar sua jornada
          </motion.span>
        </motion.button>
      )}
    </div>
  );
}
