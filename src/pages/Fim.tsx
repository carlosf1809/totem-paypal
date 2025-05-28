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

  useEffect(() => {
    salvarNovaJornada(dados);

    const myCanvas = canvasRef.current;
    if (myCanvas) {
      const myConfetti = confetti.create(myCanvas, { resize: true, useWorker: true });
      myConfetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }

    const timeout = setTimeout(reiniciar, 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6 overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-green-700 z-10"
      >
        🎉 Missão Cumprida!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-blue-900 z-10"
      >
        Sua história de sucesso está só começando.
      </motion.p>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: [ -30, 0, -10, 0 ], opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-7xl z-10"
      >
        🚀
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={reiniciar}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition z-10"
      >
        Recomeçar jornada
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-sm text-gray-500 mt-2 z-10"
      >
        (Ou aguarde 10 segundos para reinício automático)
      </motion.p>
    </div>
  );
}
