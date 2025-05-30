import { motion } from "framer-motion";
import parse from "html-react-parser";
import type { JSX } from "react";

interface TextoAnimadoProps {
  texto: string;
  delayBase?: number;
  onFinish?: () => void;
  className?: string;
}

export default function TextoAnimado({
  texto,
  delayBase = 0,
  onFinish,
  className,
}: TextoAnimadoProps) {
  // Quebra HTML em nós que podem ter classes específicas
  const elementos = typeof texto === "string" ? parse(texto) : texto;

  let letraIndex = 0;

  const renderizarLetras = (conteudo: string, classe?: string) => {
    return conteudo.split("").map((letra, i) => {
      const indexGlobal = letraIndex++;
      return (
        <motion.span
          key={indexGlobal}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: -5 }}
          transition={{
            delay: delayBase + indexGlobal * 0.02,
            duration: 0.3,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (
              onFinish &&
              indexGlobal === texto.replace(/<[^>]+>/g, "").length - 1
            ) {
              onFinish();
            }
          }}
          className={classe}
        >
          {letra}
        </motion.span>
      );
    });
  };

  const render = (element: any): JSX.Element[] => {
    if (typeof element === "string") {
      return renderizarLetras(element);
    }

    if (element && element.type === "span") {
      const className = element.props.className || "";
      return renderizarLetras(element.props.children, className);
    }

    return [];
  };

  return (
    <span className={`inline-block ${className || ""}`}>
      {Array.isArray(elementos)
        ? elementos.flatMap((e) => render(e))
        : render(elementos)}
    </span>
  );
}
