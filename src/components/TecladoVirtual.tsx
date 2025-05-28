import React from "react";

type TecladoProps = {
  onInput: (valor: string) => void;
  onBackspace: () => void;
};

const teclas: string[][] = [
  ["1","2","3","4","5","6","7","8","9","0"],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["@","z","x","c","v","b","n","m",".",","] ,
  ["back",".com"],
];

export default function TecladoVirtual({ onInput, onBackspace }: TecladoProps) {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-8">
      <div className="max-w-3xl mx-auto space-y-4">
        {teclas.map((linha, i) => (
          <div key={i} className="flex justify-center gap-4 flex-wrap text-black">
            {linha.map((t) => (
              <button
                key={t}
                className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 text-lg font-semibold min-w-[50px] shadow"
                onClick={() => t === "back" ? onBackspace() : onInput(t)}
              >
                {t === "back" ? "⌫" : t}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
