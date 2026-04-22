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
app.use(express.static(__dirname));

// ✅ IA CON APIYI
app.post("/api/ia", async (req, res) => {
    try {
        const { mensaje } = req.body;

        const response = await fetch("https://api.apiyi.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.sk-ZXk1HaolLp6BU68B236e1eF237B24fFf9910E4CbEd619a9e}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini", // puedes cambiar modelo
                messages: [
                    { role: "system", content: "Eres un asistente vocacional." },
                    { role: "user", content: mensaje }
                ]
            })
        });

        const data = await response.json();

        res.json({
            respuesta: data.choices?.[0]?.message?.content || "Sin respuesta"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error IA APIYI" });
    }
});

app.listen(PORT, () => {
    console.log("Servidor en http://localhost:3000");
});
