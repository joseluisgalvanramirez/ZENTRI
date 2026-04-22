const input = document.getElementById("inputMensaje");
const btn = document.getElementById("btnEnviar");
const chat = document.getElementById("chat");

btn.addEventListener("click", enviarMensaje);

async function enviarMensaje() {
    const mensaje = input.value.trim();

    if (!mensaje) return;

    chat.innerHTML += `<p><b>Tú:</b> ${mensaje}</p>`;

    try {
        const res = await fetch("/.netlify/functions/ia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        // 🔴 VALIDAR RESPUESTA HTTP
        if (!res.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await res.json();

        // 🔴 VALIDAR CONTENIDO
        if (!data.respuesta) {
            throw new Error("Respuesta vacía de la IA");
        }

        chat.innerHTML += `<p><b>IA:</b> ${data.respuesta}</p>`;

    } catch (error) {
        console.error("Error:", error);
        chat.innerHTML += `<p style="color:red;">Error conectando con el asistente</p>`;
    }

    input.value = "";
}
