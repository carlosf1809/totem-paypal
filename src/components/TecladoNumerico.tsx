import React from "react";

type TecladoNumericoProps = {
  onInput: (valor: string) => void;
  onBackspace: () => void;
};

const teclasNumericas: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"], 
  ["7", "8", "9"],
  ["back", "0", "clear"]
];

export default function TecladoNumerico({ onInput, onBackspace }: TecladoNumericoProps) {
  const handleClick = (key: string) => {
    if (key === "back") {
      onBackspace();
    } else if (key === "clear") {
      // Clear all - we'll need to handle this in the parent component
      onInput("CLEAR_ALL");
    } else {
      onInput(key);
    }
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-6">
      <div className="max-w-md mx-auto space-y-3">
        {teclasNumericas.map((linha, i) => (
          <div key={i} className="flex justify-center gap-3">
            {linha.map((t) => (
              <button
                key={t}
                className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg px-5 py-3 text-2xl font-bold min-w-[85px] min-h-[85px] shadow-lg text-black transition-all duration-150 hover:shadow-xl transform hover:scale-105 active:scale-95"
                onClick={() => handleClick(t)}
              >
                {t === "back" ? "⌫" : t === "clear" ? "🗑️" : t}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 