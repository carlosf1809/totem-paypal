import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


export type Perfil = "pequenas/medias" | "grandes" | null;
export type Canal = "site" | "redes" | "ecommerce";
interface JornadaData {
  perfil: Perfil;
  canal: Canal[];            // agora é array
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
  canal: [],     // array vazio
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
