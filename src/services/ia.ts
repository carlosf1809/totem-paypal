export async function enviarPerguntaIA(pergunta: string): Promise<string> {
    const response = await fetch("http://localhost:3333/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta }),
    });
  
    const data = await response.json();
    return data.resposta;
  }
  