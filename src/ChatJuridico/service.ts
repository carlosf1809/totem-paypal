// src/services/ia.ts
export interface RespostaIA {
    resposta: string;
  }
  
  export async function enviarPerguntaIA(pergunta: string): Promise<string> {
    const resp = await fetch(
      "https://localhost:7276/api/Atendimento/inteligente",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // aqui usamos "Pergunta" com P maiúsculo pra bater com o seu model C#
        body: JSON.stringify({ Pergunta: pergunta }),
      }
    );
  
    if (!resp.ok) {
      const texto = await resp.text();
      throw new Error(`Erro na API IA: ${texto}`);
    }
  
    const data = (await resp.json()) as RespostaIA;
    return data.resposta;
  }
  