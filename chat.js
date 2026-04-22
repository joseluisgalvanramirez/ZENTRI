const input = document.getElementById("inputMensaje");
const btn = document.getElementById("btnEnviar");
const chat = document.getElementById("chat");

btn.addEventListener("click", enviarMensaje);

async function enviarMensaje() {
    const mensaje = input.value.trim();

    if (!mensaje) return;

    agregarMensaje("Tú", mensaje);
    input.value = "";

    try {
        const res = await fetch("/api/ia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        const data = await res.json();

        agregarMensaje("IA", data.respuesta);

    } catch (error) {
        agregarMensaje("IA", "Error al conectar con el servidor");
        console.error(error);
    }
}

function agregarMensaje(usuario, mensaje) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${usuario}:</strong> ${mensaje}`;
    chat.appendChild(div);
}
