import React from "react";

type TecladoProps = {
  onInput: (valor: string) => void;
  onBackspace: () => void;
  onEnter?: () => void;
};

const teclas: string[][] = [
  ["1","2","3","4","5","6","7","8","9","0","back"],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m","@",".",","],
  ["_","-","+","space",".com",".com.br","enter"],
];

export default function TecladoVirtual({ onInput, onBackspace, onEnter }: TecladoProps) {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-6">
      <div className="mx-auto space-y-3">
        {teclas.map((linha, i) => (
          <div key={i} className="flex justify-center gap-3 flex-wrap text-black">
            {linha.map((t) => (
              <button
                key={t}
                className={`bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg px-4 py-3 text-xl font-bold shadow-lg transition-all duration-150 ${
                  t === "space" ? "min-w-[220px] min-h-[65px]" : 
                  t === "enter" ? "min-w-[92px] min-h-[65px]" :
                  t === ".com.br" ? "min-w-[82px] min-h-[65px]" :
                  "min-w-[65px] min-h-[65px]"
                } hover:shadow-xl transform hover:scale-105 active:scale-95`}
                onClick={() => {
                  if (t === "back") {
                    onBackspace();
                  } else if (t === "space") {
                    onInput(" ");
                  } else if (t === "enter") {
                    onEnter?.();
                  } else if (t === ".com.br") {
                    onInput(".com.br");
                  } else {
                    onInput(t);
                  }
                }}
              >
                {t === "back" ? "⌫" : 
                 t === "space" ? "Espaço" : 
                 t === "enter" ? "↵" : 
                 t}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
