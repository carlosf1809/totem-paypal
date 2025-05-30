// src/pages/Fim.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useJornada } from "../context/JornadaContext";
import { salvarNovaJornada } from "../utils/storage";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Fim() {
  const navigate = useNavigate();
  const { dados, resetar } = useJornada();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reiniciar = () => {
    resetar();
    navigate("/");
  };

  // useEffect(() => {
  //   salvarNovaJornada(dados);

  //   const myCanvas = canvasRef.current;
  //   if (myCanvas) {
  //     const myConfetti = confetti.create(myCanvas, { resize: true, useWorker: true });
  //     myConfetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
  //   }

  //   const timeout = setTimeout(reiniciar, 10000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Canvas de confete */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Conteúdo */}
      <div className="z-10 w-full max-w-3xl px-6 flex flex-col">
        {/* Título */}
        <motion.h1
          className="text-5xl md:text-8xl font-extrabold leading-snug text-white mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Missão<br />Cumprida.
        </motion.h1>

        {/* Card branco */}
        <div className="w-full flex items-center justify-center"> 
          <motion.div
            className="bg-white text-[#1a1a1a] w-[90%] rounded-2xl p-12 shadow-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xl md:text-4xl font-bold mb-8">
              Sua história de{" "}
              <span className="text-[#0070E0] font-semibold">sucesso</span>{" "}
              está só começando!
            </p>

        </motion.div>
        </div>

        {/* Botão dentro do card */}
        <div className="w-full flex items-center justify-center z-10 -mt-10"> 
          <motion.button
            onClick={reiniciar}
            className="bg-[#0070E0] hover:bg-[#0059b2] text-4xl w-[70%] -tracking-tighter text-white py-6 px-12 rounded-lg font-medium shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Recomeçar jornada
          </motion.button>

        </div>

        {/* Imagem de celebração */}
        <motion.img
          src="/assets/fim-imagem.jpg"
          alt="Pessoas celebrando"
          className="w-full mt-12 rounded-3xl object-cover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />
      </div>
    </div>
  );
}
