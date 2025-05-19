import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJornada } from "../context/JornadaContext";
import { salvarNovaJornada } from "../utils/storage"; // importe no topo

export default function Fim() {
  const navigate = useNavigate();
  const { dados, resetar } = useJornada();

  const reiniciar = () => {
    resetar();
    navigate("/");
  };


  useEffect(() => {
    salvarNovaJornada(dados); // salva a jornada concluída
    const timeout = setTimeout(reiniciar, 10000);
    return () => clearTimeout(timeout);
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <h2 className="text-3xl font-bold text-green-700">🎉 Missão Cumprida!</h2>
      <p className="text-lg">Sua história de sucesso está só começando.</p>

      <div className="text-6xl">🎆🎇</div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
        onClick={reiniciar}
      >
        Recomeçar jornada
      </button>

      <p className="text-sm text-gray-500 mt-2">(Ou aguarde 10 segundos para reinício automático)</p>
    </div>
  );
}
