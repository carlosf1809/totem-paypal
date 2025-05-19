import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  const selecionarPerfil = (perfil: "leo" | "ana") => {
    atualizar({ perfil });
    navigate("/presenca");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <h2 className="text-2xl font-bold">Com quem você se identifica?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          className="p-6 border rounded-xl hover:bg-blue-50 cursor-pointer transition"
          onClick={() => selecionarPerfil("leo")}
        >
          <div className="text-4xl mb-2">🧑</div>
          <h3 className="text-lg font-semibold">Sou como o Léo</h3>
          <p className="text-sm">Tenho um site, mas preciso impulsionar minhas vendas.</p>
        </div>

        <div
          className="p-6 border rounded-xl hover:bg-blue-50 cursor-pointer transition"
          onClick={() => selecionarPerfil("ana")}
        >
          <div className="text-4xl mb-2">👩‍🦰</div>
          <h3 className="text-lg font-semibold">Sou como a Ana</h3>
          <p className="text-sm">Procuro soluções para escalar com performance.</p>
        </div>
      </div>
    </div>
  );
}
