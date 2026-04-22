const input = document.getElementById("inputMensaje");
const boton = document.getElementById("btnEnviar");
const chat = document.getElementById("chat");

boton.addEventListener("click", enviarMensaje);

async function enviarMensaje() {
    const mensaje = input.value;

    if (!mensaje) return;

    chat.innerHTML += `<p><b>Tú:</b> ${mensaje}</p>`;

    try {
        const res = await fetch("https://TU-PROYECTO.onrender.com/api/ia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        const data = await res.json();

        chat.innerHTML += `<p><b>IA:</b> ${data.respuesta}</p>`;

    } catch (error) {
        chat.innerHTML += `<p style="color:red;">Error con la IA</p>`;
        console.error(error);
    }

    input.value = "";
}
