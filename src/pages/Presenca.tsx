// src/pages/Presenca.tsx
import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";

export default function Presenca() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();

  const selecionarCanal = (canal: "site" | "redes" | "ecommerce") => {
    atualizar({ canal });
    navigate("/desafios"); // (criaremos essa tela depois)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <h2 className="text-2xl font-bold">Onde sua história acontece?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div
          className="p-6 border rounded-xl hover:bg-blue-50 cursor-pointer transition"
          onClick={() => selecionarCanal("site")}
        >
          <h3 className="text-lg font-semibold">Meu palco é um site</h3>
          <p className="text-sm">Tenho uma loja virtual</p>
        </div>

        <div
          className="p-6 border rounded-xl hover:bg-blue-50 cursor-pointer transition"
          onClick={() => selecionarCanal("redes")}
        >
          <h3 className="text-lg font-semibold">Meu negócio vive nas redes</h3>
          <p className="text-sm">Atendo clientes pelo WhatsApp ou redes sociais</p>
        </div>

        <div
          className="p-6 border rounded-xl hover:bg-blue-50 cursor-pointer transition"
          onClick={() => selecionarCanal("ecommerce")}
        >
          <h3 className="text-lg font-semibold">Estou em um e-commerce grande</h3>
          <p className="text-sm">Recebo muitos acessos por dia</p>
        </div>
      </div>
    </div>
  );
}
