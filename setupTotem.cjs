const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src");

const folders = [
  "pages",
  "context",
  "utils",
  "router",
  "components",
];

const files = {
  "context/JornadaContext.tsx": `import { createContext, useContext, useState, ReactNode } from "react";

export type Perfil = "leo" | "ana" | null;
export type Canal = "site" | "redes" | "ecommerce" | null;

interface JornadaData {
  perfil: Perfil;
  canal: Canal;
  desafios: string[];
  email?: string;
}

interface JornadaContextType {
  dados: JornadaData;
  atualizar: (novosDados: Partial<JornadaData>) => void;
  resetar: () => void;
}

const JornadaContext = createContext<JornadaContextType | undefined>(undefined);

const defaultValues: JornadaData = {
  perfil: null,
  canal: null,
  desafios: [],
  email: undefined,
};

export const JornadaProvider = ({ children }: { children: ReactNode }) => {
  const [dados, setDados] = useState<JornadaData>(defaultValues);

  const atualizar = (novosDados: Partial<JornadaData>) => {
    setDados((prev) => ({ ...prev, ...novosDados }));
  };

  const resetar = () => {
    setDados(defaultValues);
  };

  return (
    <JornadaContext.Provider value={{ dados, atualizar, resetar }}>
      {children}
    </JornadaContext.Provider>
  );
};

export const useJornada = () => {
  const context = useContext(JornadaContext);
  if (!context) throw new Error("useJornada precisa estar dentro do JornadaProvider");
  return context;
};
`,

  "utils/storage.ts": `import localforage from "localforage";

const STORAGE_KEY = "jornada_paypal";

export const salvarJornada = async (dados: any) => {
  await localforage.setItem(STORAGE_KEY, dados);
};

export const carregarJornada = async () => {
  return await localforage.getItem(STORAGE_KEY);
};

export const limparJornada = async () => {
  await localforage.removeItem(STORAGE_KEY);
};
`,

  "pages/BoasVindas.tsx": `import { useNavigate } from "react-router-dom";

export default function BoasVindas() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
      <h1 className="text-3xl font-bold">Imagine sua próxima venda… sem barreiras.</h1>
      <p className="text-xl">Pronto para virar o herói da sua própria história?</p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
        onClick={() => navigate("/perfil")}
      >
        Vamos começar sua jornada
      </button>
    </div>
  );
}
`,

  "pages/Perfil.tsx": `export default function Perfil() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-2xl">Tela de Perfil – em construção</h2>
    </div>
  );
}
`,

  "App.tsx": `import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JornadaProvider } from "./context/JornadaContext";
import BoasVindas from "./pages/BoasVindas";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <JornadaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </JornadaProvider>
  );
}

export default App;
`
};

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`📁 Pasta criada: ${folder}`);
  }
});

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(baseDir, filePath);
  fs.writeFileSync(fullPath, content);
  console.log(`📄 Arquivo criado: ${filePath}`);
});
