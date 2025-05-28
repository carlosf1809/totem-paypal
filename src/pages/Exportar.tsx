// src/pages/Exportar.tsx
import { useEffect, useState } from "react";
import { obterTodasJornadas, limparJornadas } from "../utils/storage";
import * as XLSX from "xlsx";

export default function Exportar() {
  const [jornadas, setJornadas] = useState<any[]>([]);

  useEffect(() => {
    obterTodasJornadas().then(setJornadas);
  }, []);

  const exportarParaExcel = () => {
    if (jornadas.length === 0) return alert("Nenhuma jornada para exportar.");

    // Transforma objetos em linhas de Excel
    const ws = XLSX.utils.json_to_sheet(jornadas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jornadas");

    // Cria e baixa o arquivo
    XLSX.writeFile(wb, "jornadas_paypal.xlsx");
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
          onClick={exportarParaExcel}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          📊 Baixar Excel
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
