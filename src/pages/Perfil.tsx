import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import AvatarLeo from "../assets/pequenas-medias.png";
import AvatarAna from "../assets/grande-empresa.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TextoAnimado from "../components/TextoAnimado";

export default function Perfil() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarAvatares(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const selecionarPerfil = (perfil: "pequenas/medias" | "grandes") => {
    atualizar({ perfil });
    navigate("/local-cliente");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-white">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-36 text-center w-[80%]"
      >
        <p className="text-2xl md:text-4xl font-semibold text-[#6CC3FF] mb-2">
          Conte mais sobre você.
        </p>
        <TextoAnimado
          texto="Como você se identifica no mercado hoje?"
          delayBase={0.2}
          className="text-6xl md:text-5xl font-bold"
        />
      </motion.div>

      {/* Cards de perfil */}
      {mostrarAvatares && (
        <div className="flex flex-col gap-24 w-[45%]">
          {/* Léo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => selecionarPerfil("pequenas/medias")}
            className="
              flex items-center justify-center gap-10 relative 
               hover:bg-[#003087] transition-colors 
              rounded-3xl px-6 py-6 cursor-pointer shadow-lg 
              active:scale-95 select-none
            "
          >
            <div className="relative flex justify-center items-center">
              <div className="bg-white rounded-xl p-10">
                <img
                  src={AvatarLeo}
                  alt="Avatar Léo"
                  className="w-52 h-52 object-contain"
                />
              </div>
            </div>
              <button
                className="absolute bottom-[-20px] w-full bg-[#0070E0] text-white text-xl md:text-2xl lg:text-3xl font-medium px-4 md:px-8 lg:px-12 py-3 rounded-sm shadow text-center leading-tight"
              >
                Pequena/média empresa
              </button>
            {/* <p className="text-[#6CC3FF] text-2xl font-semibold">Oi, eu sou o Léo.</p> */}
          </motion.div>

          {/* Ana */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => selecionarPerfil("grandes")}
            className="
              flex items-center justify-center gap-10 relative 
               hover:bg-[#003087] transition-colors 
              rounded-3xl px-6 py-6 cursor-pointer shadow-lg 
              active:scale-95 select-none
            "
          >
            <div className="relative flex justify-center items-center">
              <div className="bg-white rounded-xl p-10">
                <img
                  src={AvatarAna}
                  alt="Avatar Ana"
                  className="w-52 h-52 object-contain"
                />
              </div>
            </div>
              <button
                className="absolute bottom-[-20px] w-full bg-[#0070E0] text-white text-xl md:text-2xl lg:text-3xl font-medium px-4 md:px-8 lg:px-12 py-3 rounded-sm shadow text-center leading-tight"
              >
                Grande empresa
              </button>
            {/* <p className="text-[#6CC3FF] text-2xl font-semibold">Olá, sou a Ana.</p> */}
          </motion.div>
        </div>
      )}
    </div>
  );
}
