type TecladoProps = {
    onInput: (valor: string) => void;
    onBackspace: () => void;
  };
  
  const teclas = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["@", "z", "x", "c", "v", "b", "n", "m", "."],
    ["back", ".com"],
  ];
  
  export default function TecladoVirtual({ onInput, onBackspace }: TecladoProps) {
    return (
      <div className="mt-5 space-y-4 max-w-4xl mx-auto px-22">
        {teclas.map((linha, i) => (
          <div key={i} className="flex justify-center gap-4  flex-wrap">
            {linha.map((t) => (
              <button
                key={t}
                className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-3 text-lg font-semibold min-w-[50px]"
                onClick={() => (t === "back" ? onBackspace() : onInput(t))}
              >
                {t === "back" ? "⌫" : t}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  