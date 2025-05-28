import { motion } from "framer-motion";

interface TextoAnimadoProps {
  texto: string;
  delayBase?: number;
  onFinish?: () => void;
}

export default function TextoAnimado({ texto, delayBase = 0, onFinish }: TextoAnimadoProps) {
  const letras = texto.split("");

  return (
    <span className="inline-block">
      {letras.map((letra, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: -5 }}
          transition={{
            delay: delayBase + i * 0.02,
            duration: 0.3,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (i === letras.length - 1 && onFinish) onFinish();
          }}
        >
          {letra}
        </motion.span>
      ))}
    </span>
  );
}
