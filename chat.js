const input = document.getElementById("inputMensaje");
const btn = document.getElementById("btnEnviar");
const chat = document.getElementById("chat");

// Detecta entorno (local vs producción)
const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:5501"
    : "https://TU-PROYECTO.onrender.com"; // <-- CAMBIA ESTO

btn.addEventListener("click", async () => {
    const mensaje = input.value;

    if (!mensaje) return;

    chat.innerHTML += `<p><b>Tú:</b> ${mensaje}</p>`;

    try {
        const res = await fetch(`${API_URL}/api/ia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        const data = await res.json();

        chat.innerHTML += `<p><b>IA:</b> ${data.respuesta}</p>`;

    } catch (error) {
        chat.innerHTML += `<p style="color:red;">Error de conexión</p>`;
    }

    input.value = "";
});
