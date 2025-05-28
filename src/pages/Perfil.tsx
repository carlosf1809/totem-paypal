import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import AvatarLeo from "../assets/avatar-leo.png";
import AvatarAna from "../assets/avatar-ana.png";
import AvatarRobo from "../assets/avatar-robo.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TextoAnimado from "../components/TextoAnimado";

export default function Perfil() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  const [mostrarAvatares, setMostrarAvatares] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarAvatares(true);
    }, 1600); // espera o texto animar antes de mostrar os avatares

    return () => clearTimeout(timer);
  }, []);

  const selecionarPerfil = (perfil: "leo" | "ana") => {
    atualizar({ perfil });
    navigate("/presenca");
  };

  const acessarIA = () => {
    navigate("/chat-ia");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-5xl font-bold text-center"
      >
        <TextoAnimado texto="Como voce se identifica no mercado hoje?" delayBase={0} />
      </motion.div>

      {mostrarAvatares && (
        <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-6 w-full max-w-6xl">
          {/* Léo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer transition text-center"
            onClick={() => selecionarPerfil("leo")}
          >
            <img src={AvatarLeo} alt="Avatar Léo" className="mx-auto w-40 h-40 object-contain mb-4" />
            <h3 className="text-xl font-bold text-[#002e80]">Sou como o Léo</h3>
            <p className="text-sm text-gray-600 mt-1">Tenho um site e quero vender mais</p>
          </motion.div>

          {/* Ana */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer transition text-center"
            onClick={() => selecionarPerfil("ana")}
          >
            <img src={AvatarAna} alt="Avatar Ana" className="mx-auto w-40 h-40 object-contain mb-4" />
            <h3 className="text-xl font-bold text-[#002e80]">Sou como a Ana</h3>
            <p className="text-sm text-gray-600 mt-1">Quero escalar com performance</p>
          </motion.div>

          {/* IA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl p-6 hover:shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer transition text-center"
            onClick={acessarIA}
          >
            <img src={AvatarRobo} alt="Avatar IA" className="mx-auto w-40 h-40 object-contain mb-4" />
            <h3 className="text-xl font-bold text-[#002e80]">Quero uma sugestão inteligente</h3>
            <p className="text-sm text-gray-600 mt-1">Converse com nossa IA e descubra a solução ideal</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
