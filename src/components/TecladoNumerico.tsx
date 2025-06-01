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
    <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-8">
      <div className="max-w-lg mx-auto space-y-4">
        {teclasNumericas.map((linha, i) => (
          <div key={i} className="flex justify-center gap-4">
            {linha.map((t) => (
              <button
                key={t}
                className="bg-gray-200 hover:bg-gray-300 rounded px-6 py-4 text-xl font-semibold min-w-[60px] min-h-[60px] shadow text-black"
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