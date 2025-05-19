import { useJornada } from "../context/JornadaContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Acao() {
  const { atualizar } = useJornada();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const enviarEmail = () => {
    if (!email.includes("@")) return alert("Digite um e-mail válido.");
    atualizar({ email });
    navigate("/fim");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-6">
      <h2 className="text-2xl font-bold">Queremos ser seu companheiro de jornada</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full text-left">
        <button
          className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition"
          onClick={() => navigate("/fim")}
        >
          💬 Quero conversar com um especialista
        </button>

        <div className="bg-gray-100 p-4 rounded-xl">
          <label className="block mb-2 font-semibold">📧 Enviar detalhes por e-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full px-4 py-2 rounded border"
          />
          <button
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={enviarEmail}
          >
            Enviar
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <p className="mb-2">📱 Escaneie o QR Code para saber mais:</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.paypal.com/br/home"
            alt="QR Code"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
