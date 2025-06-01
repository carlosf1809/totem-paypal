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
    if (jornadas.length === 0) {
      return alert("Nenhuma jornada para exportar.");
    }

    // 1) Transformamos cada objeto de jornada em uma versão "achatada",
    //    onde arrays viram strings separadas por vírgula:
    const linhasParaExcel = jornadas.map((j) => ({
      data: j.data,
      email: j.email || "Não informado",
      fullName: j.fullName || "Não informado", 
      phone: j.phone || "Não informado",
      company: j.company || "Não informado",
      perfil: j.perfil,
      canal: Array.isArray(j.canal) ? j.canal.join(", ") : j.canal || "",
      desafios: Array.isArray(j.desafios) ? j.desafios.join(", ") : j.desafios || "",
    }));

    // 2) Gera a planilha a partir do JSON "achatado"
    const ws = XLSX.utils.json_to_sheet(linhasParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jornadas");

    // 3) Faz o download do arquivo
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

        {/* Se quiser liberar o botão de limpeza, basta descomentar */}
        {/*
        <button
          onClick={limpar}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          🗑️ Apagar tudo
        </button>
        */}
      </div>
    </div>
  );
}
