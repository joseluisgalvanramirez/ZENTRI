import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🔐 Obtener token
async function obtenerToken() {
    const res = await fetch("https://api.apiyi.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apiKey: process.env.APIYI_KEY
        })
    });

    const data = await res.json();
    return data.token;
}

// 🤖 Ruta IA
app.post("/api/ia", async (req, res) => {
    try {
        const { mensaje } = req.body;

        const token = await obtenerToken();

        // ⚠️ ESTA RUTA ES EJEMPLO (puede cambiar según APIYI)
        const response = await fetch("https://api.apiyi.com/chat", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: mensaje
            })
        });

        const data = await response.json();

        res.json({
            respuesta: data.response || "Sin respuesta"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error con APIYI" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
