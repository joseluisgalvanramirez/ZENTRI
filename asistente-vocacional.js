class AsistenteVocacional {

    constructor() {
        // Usar el servidor local o de producción
        const isLocal = window.location.hostname === "localhost" || 
                       window.location.hostname === "127.0.0.1";
        
        this.apiURL = isLocal 
            ? "http://localhost:5501/api/ia"
            : "/api/ia"; // En producción, ruta relativa
        
        this.carrerasDB = window.CARRERAS_DB || {};
        
        console.log("🤖 Asistente vocacional con IA iniciado");
        console.log(`📡 Conectando a: ${this.apiURL}`);
    }

    /* =========================
    BUSCAR CARRERA
    ========================= */
    buscarCarrera(texto) {
        texto = texto.toLowerCase();
        
        for (const area in this.carrerasDB) {
            const carreras = this.carrerasDB[area]?.carreras || [];
            for (const carrera of carreras) {
                if (texto.includes(carrera.nombre.toLowerCase())) {
                    return carrera;
                }
            }
        }
        return null;
    }

    /* =========================
    BUSCAR AREA
    ========================= */
    buscarArea(texto) {
        texto = texto.toLowerCase();
        
        for (const area in this.carrerasDB) {
            if (texto.includes(area.toLowerCase())) {
                return this.carrerasDB[area];
            }
        }
        return null;
    }

    /* =========================
    INFORMACION DE CARRERA
    ========================= */
    infoCarrera(carrera) {
        return `
Carrera: ${carrera.nombre}

Descripción:
${carrera.descripcion}

Duración:
${carrera.duracion || "No especificada"}

Salario promedio:
${carrera.salario_promedio || "Información no disponible"}

Campo laboral:
${Array.isArray(carrera.campo_laboral) ? carrera.campo_laboral.join(", ") : carrera.campo_laboral || "Información no disponible"}
`;
    }

    /* =========================
    LISTA DE AREAS
    ========================= */
    generarListaAreas() {
        let texto = "ÁREAS DISPONIBLES:\n";
        
        for (const area in this.carrerasDB) {
            texto += `\n📚 ${area.toUpperCase()}:\n`;
            const carreras = this.carrerasDB[area]?.carreras || [];
            carreras.forEach(c => {
                texto += `   • ${c.nombre}\n`;
            });
        }
        
        return texto;
    }

    /* =========================
    PREGUNTAR A IA (vía servidor propio)
    ========================= */
    async preguntarIA(pregunta) {
        try {
            const respuesta = await fetch(this.apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mensaje: pregunta })
            });

            if (!respuesta.ok) {
                throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
            }

            const data = await respuesta.json();
            
            return {
                texto: data.respuesta || "Lo siento, no pude procesar tu pregunta.",
                sugerencias: this.generarSugerencias(pregunta)
            };

        } catch (error) {
            console.error("Error en API:", error);
            return {
                texto: "⚠️ Error de conexión. Por favor, intenta de nuevo más tarde.\n\nTambién puedes explorar las carreras directamente desde el menú.",
                sugerencias: ["Ver todas las carreras", "Test vocacional", "Áreas profesionales"]
            };
        }
    }

    /* =========================
    GENERAR SUGERENCIAS INTELIGENTES
    ========================= */
    generarSugerencias(pregunta) {
        const preguntaLower = pregunta.toLowerCase();
        
        // Sugerencias basadas en el contexto
        if (preguntaLower.includes("tecnologia") || preguntaLower.includes("tech")) {
            return ["Ingeniería en Software", "Inteligencia Artificial", "Ver más carreras tech"];
        }
        
        if (preguntaLower.includes("salud") || preguntaLower.includes("medicina")) {
            return ["Medicina", "Enfermería", "Psicología"];
        }
        
        if (preguntaLower.includes("negocio") || preguntaLower.includes("empresa")) {
            return ["Administración", "Marketing", "Finanzas"];
        }
        
        if (preguntaLower.includes("arte") || preguntaLower.includes("diseño")) {
            return ["Diseño Gráfico", "Arquitectura", "Artes visuales"];
        }
        
        // Sugerencias por defecto
        return [
            "¿Qué carreras hay?",
            "Test vocacional",
            "Carreras de tecnología",
            "Carreras de salud"
        ];
    }

    /* =========================
    PROCESAR PREGUNTA (punto de entrada principal)
    ========================= */
    async procesarPregunta(pregunta) {
        if (!pregunta || pregunta.trim() === "") {
            return {
                texto: "Por favor, escribe una pregunta. Puedo ayudarte con:\n\n• Información sobre carreras\n• Recomendaciones vocacionales\n• Áreas de estudio\n• Test vocacional",
                sugerencias: this.generarSugerencias("")
            };
        }

        try {
            return await this.preguntarIA(pregunta);
        } catch (error) {
            console.error("Error procesando pregunta:", error);
            return {
                texto: "❌ Lo siento, hubo un error. Por favor, intenta de nuevo.\n\nTambién puedes explorar las carreras en la sección 'Carreras' del menú.",
                sugerencias: ["Ver carreras", "Test vocacional", "Volver a intentar"]
            };
        }
    }

    /* =========================
    RESPUESTA RÁPIDA SIN IA (fallback)
    ========================= */
    respuestaLocal(pregunta) {
        const preguntaLower = pregunta.toLowerCase();
        
        // Buscar carrera específica
        const carrera = this.buscarCarrera(pregunta);
        if (carrera) {
            return this.infoCarrera(carrera);
        }
        
        // Buscar área
        const area = this.buscarArea(pregunta);
        if (area) {
            let respuesta = `📚 ÁREA: ${area.nombre} ${area.icono}\n\n`;
            respuesta += `${area.descripcion || "Explora las siguientes carreras:"}\n\n`;
            area.carreras.forEach(c => {
                respuesta += `• ${c.nombre}\n`;
            });
            respuesta += `\n¿Te gustaría más información sobre alguna carrera específica?`;
            return respuesta;
        }
        
        // Preguntas comunes
        if (preguntaLower.includes("test") || preguntaLower.includes("vocacional")) {
            return "🎯 El test vocacional te ayuda a descubrir qué carreras se adaptan mejor a tus intereses y habilidades. ¡Son solo 8 preguntas! Puedes comenzar desde la página principal o desde el menú 'Test Vocacional'.";
        }
        
        if (preguntaLower.includes("carreras") && preguntaLower.includes("cuantas")) {
            let total = 0;
            for (const area in this.carrerasDB) {
                total += this.carrerasDB[area].carreras.length;
            }
            return `📊 Actualmente tenemos ${total} carreras disponibles en ${Object.keys(this.carrerasDB).length} áreas profesionales. ¿Te interesa alguna área en específico?`;
        }
        
        if (preguntaLower.includes("hola") || preguntaLower.includes("buenas")) {
            return "👋 ¡Hola! Soy ZENTRI, tu asistente vocacional. Puedo ayudarte a elegir una carrera, darte información sobre áreas de estudio o recomendarte el test vocacional. ¿En qué puedo ayudarte hoy?";
        }
        
        return null;
    }
}

/* =========================
INICIALIZAR
========================= */
if (typeof window !== "undefined") {
    // Esperar a que CARRERAS_DB esté cargada
    if (window.CARRERAS_DB) {
        window.asistenteVocacional = new AsistenteVocacional();
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            window.asistenteVocacional = new AsistenteVocacional();
        });
    }
}
