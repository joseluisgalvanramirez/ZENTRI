export async function handler(event) {
    try {
        const { mensaje } = JSON.parse(event.body);

        if (!mensaje) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    respuesta: "Escribe un mensaje"
                })
            };
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Eres un orientador vocacional para estudiantes."
                    },
                    {
                        role: "user",
                        content: mensaje
                    }
                ]
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                respuesta: data.choices?.[0]?.message?.content || "Error IA"
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                respuesta: "Error del servidor"
            })
        };
    }
}
