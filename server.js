async function enviarMensaje() {
    const input = document.getElementById("inputMensaje");
    const chat = document.getElementById("chat");

    const mensaje = input.value;
    if (!mensaje) return;

    chat.innerHTML += `<div>🧑 ${mensaje}</div>`;

    try {
        const response = await fetch("https://api.apiyi.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer TU_API_KEY_AQUI"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: mensaje }
                ]
            })
        });

        const data = await response.json();

        const respuesta = data.choices?.[0]?.message?.content || "Error";

        chat.innerHTML += `<div>🤖 ${respuesta}</div>`;

    } catch (error) {
        chat.innerHTML += `<div>⚠️ Error al conectar</div>`;
    }

    input.value = "";
}
