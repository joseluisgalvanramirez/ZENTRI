export async function handler(event) {
    try {
        const { mensaje } = JSON.parse(event.body);

        if (!mensaje) {
            return {
                statusCode: 400,
                body: JSON.stringify({ respuesta: "Mensaje vacío" })
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
                    { role: "system", content: "Eres un orientador vocacional." },
                    { role: "user", content: mensaje }
                ]
            })
        });

        const data = await response.json();

        if (!data.choices) {
            return {
                statusCode: 500,
                body: JSON.stringify({ respuesta: "Error en IA (API)" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                respuesta: data.choices[0].message.content
            })
        };

    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                respuesta: "Error del servidor"
            })
        };
    }
}
