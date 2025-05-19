// src/pages/Exportar.tsx
import { useEffect, useState } from "react";
import { obterTodasJornadas, limparJornadas } from "../utils/storage";

export default function Exportar() {
  const [jornadas, setJornadas] = useState<any[]>([]);

  useEffect(() => {
    obterTodasJornadas().then(setJornadas);
  }, []);

  const exportar = () => {
    const blob = new Blob([JSON.stringify(jornadas, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "jornadas_paypal.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const limpar = async () => {
    await limparJornadas();
    setJornadas([]);
    alert("Jornadas apagadas.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <h2 className="text-2xl font-bold">Exportar Jornadas</h2>

      <p>Total registrado: {jornadas.length}</p>

      <div className="flex gap-4">
        <button
          onClick={exportar}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          📥 Baixar JSON
        </button>

        {/* <button
          onClick={limpar}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          🗑️ Apagar tudo
        </button> */}
      </div>
    </div>
  );
}
