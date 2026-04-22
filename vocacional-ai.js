/**
 * ZENTRI VOCACIONAL - Motor de IA para orientación vocacional
 */

class VocacionalAI {
    constructor() {
        this.perfilUsuario = null;
        this.recomendaciones = [];
        this.carrerasDB = window.CARRERAS_DB || {};
        this.perfilesDB = window.PERFILES_VOCACIONALES || {};
        
        // Cargar datos guardados al iniciar
        this.cargarResultados();
    }

    procesarTest(respuestas) {
        const puntajes = {
            analitico: 0,
            creativo: 0,
            social: 0,
            emprendedor: 0,
            practico: 0,
            investigador: 0
        };

        // Procesar cada respuesta
        respuestas.forEach(respuesta => {
            if (respuesta && respuesta.categoria && puntajes.hasOwnProperty(respuesta.categoria)) {
                puntajes[respuesta.categoria] += respuesta.valor || 5;
            }
        });

        // Encontrar perfil principal (mayor puntaje)
        let perfilPrincipal = 'analitico';
        let maxPuntaje = 0;
        
        for (const [tipo, puntaje] of Object.entries(puntajes)) {
            if (puntaje > maxPuntaje) {
                maxPuntaje = puntaje;
                perfilPrincipal = tipo;
            }
        }

        // Encontrar perfiles secundarios
        const perfilesSecundarios = Object.keys(puntajes)
            .filter(p => p !== perfilPrincipal)
            .sort((a, b) => puntajes[b] - puntajes[a])
            .slice(0, 2);

        this.perfilUsuario = {
            principal: perfilPrincipal,
            secundarios: perfilesSecundarios,
            puntajes: puntajes,
            fecha: new Date().toISOString()
        };

        this.recomendaciones = this.generarRecomendaciones(this.perfilUsuario);
        
        return {
            perfil: this.perfilUsuario,
            recomendaciones: this.recomendaciones
        };
    }

    generarRecomendaciones(perfil) {
        const recomendaciones = [];
        const carrerasVistas = new Set();

        // Obtener carreras del perfil principal
        const carrerasPrincipales = this.perfilesDB[perfil.principal]?.carreras_recomendadas || [];
        
        // Obtener carreras de perfiles secundarios
        const carrerasSecundarias = [];
        perfil.secundarios.forEach(p => {
            const carreras = this.perfilesDB[p]?.carreras_recomendadas || [];
            carrerasSecundarias.push(...carreras);
        });

        // Combinar y priorizar
        const todasCarreras = [...carrerasPrincipales, ...carrerasSecundarias];
        
        // Buscar información detallada de cada carrera
        for (const carreraId of todasCarreras) {
            if (!carrerasVistas.has(carreraId) && carreraId) {
                const carrera = this.buscarCarreraPorId(carreraId);
                if (carrera) {
                    recomendaciones.push({
                        ...carrera,
                        id: carreraId,
                        nivel_recomendacion: carrerasPrincipales.includes(carreraId) ? 'alto' : 'medio'
                    });
                    carrerasVistas.add(carreraId);
                }
            }
        }

        return recomendaciones.slice(0, 10);
    }

    buscarCarreraPorId(id) {
        if (!id) return null;
        
        for (const area in this.carrerasDB) {
            const carreras = this.carrerasDB[area]?.carreras || [];
            const encontrada = carreras.find(c => c.id === id);
            if (encontrada) {
                return {
                    ...encontrada,
                    area: this.carrerasDB[area].nombre,
                    area_icono: this.carrerasDB[area].icono,
                    area_color: this.carrerasDB[area].color
                };
            }
        }
        return null;
    }

    generarPreguntasTest() {
        return [
            {
                id: 1,
                pregunta: "¿Qué actividad disfrutas más en tu tiempo libre?",
                opciones: [
                    { texto: "Leer libros de ciencia o resolver problemas", valor: 5, categoria: "analitico" },
                    { texto: "Dibujar, pintar o hacer manualidades", valor: 5, categoria: "creativo" },
                    { texto: "Salir con amigos o ayudar a otros", valor: 5, categoria: "social" },
                    { texto: "Ver videos de emprendedores o pensar en negocios", valor: 5, categoria: "emprendedor" },
                    { texto: "Arreglar cosas, construir o hacer ejercicio", valor: 5, categoria: "practico" },
                    { texto: "Investigar temas que te interesan a fondo", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 2,
                pregunta: "¿Qué materia se te facilitaba más en la escuela?",
                opciones: [
                    { texto: "Matemáticas o Física", valor: 5, categoria: "analitico" },
                    { texto: "Artes o Música", valor: 5, categoria: "creativo" },
                    { texto: "Historia o Formación Cívica", valor: 5, categoria: "social" },
                    { texto: "Economía o Administración", valor: 5, categoria: "emprendedor" },
                    { texto: "Talleres o Educación Física", valor: 5, categoria: "practico" },
                    { texto: "Biología o Química", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 3,
                pregunta: "¿Cómo te describirían tus amigos?",
                opciones: [
                    { texto: "Analítico y lógico, siempre pensando", valor: 5, categoria: "analitico" },
                    { texto: "Creativo y original, con buenas ideas", valor: 5, categoria: "creativo" },
                    { texto: "Amigable y comprensivo, buen consejero", valor: 5, categoria: "social" },
                    { texto: "Líder y motivador, con visión de futuro", valor: 5, categoria: "emprendedor" },
                    { texto: "Práctico y hábil, resuelve problemas", valor: 5, categoria: "practico" },
                    { texto: "Curioso y preguntón, le gusta aprender", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 4,
                pregunta: "¿Qué valoras más en un trabajo?",
                opciones: [
                    { texto: "Resolver problemas complejos", valor: 5, categoria: "analitico" },
                    { texto: "Expresar mi creatividad", valor: 5, categoria: "creativo" },
                    { texto: "Ayudar a las personas", valor: 5, categoria: "social" },
                    { texto: "Crear mi propio negocio o proyecto", valor: 5, categoria: "emprendedor" },
                    { texto: "Ver resultados tangibles de mi trabajo", valor: 5, categoria: "practico" },
                    { texto: "Descubrir cosas nuevas", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 5,
                pregunta: "¿Qué prefieres hacer en un proyecto grupal?",
                opciones: [
                    { texto: "Analizar datos y planificar", valor: 5, categoria: "analitico" },
                    { texto: "Diseñar la presentación o material visual", valor: 5, categoria: "creativo" },
                    { texto: "Coordinar al equipo y motivar", valor: 5, categoria: "social" },
                    { texto: "Tomar decisiones y definir estrategias", valor: 5, categoria: "emprendedor" },
                    { texto: "Hacer la parte práctica o construir algo", valor: 5, categoria: "practico" },
                    { texto: "Investigar información a fondo", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 6,
                pregunta: "¿Qué habilidad te gustaría desarrollar más?",
                opciones: [
                    { texto: "Pensamiento lógico y analítico", valor: 5, categoria: "analitico" },
                    { texto: "Creatividad e innovación", valor: 5, categoria: "creativo" },
                    { texto: "Empatía y comunicación", valor: 5, categoria: "social" },
                    { texto: "Liderazgo y negociación", valor: 5, categoria: "emprendedor" },
                    { texto: "Habilidades manuales y técnicas", valor: 5, categoria: "practico" },
                    { texto: "Método científico e investigación", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 7,
                pregunta: "¿Qué tipo de problemas te gusta resolver?",
                opciones: [
                    { texto: "Acertijos lógicos o problemas matemáticos", valor: 5, categoria: "analitico" },
                    { texto: "Problemas de diseño o expresión artística", valor: 5, categoria: "creativo" },
                    { texto: "Problemas personales o emocionales de otros", valor: 5, categoria: "social" },
                    { texto: "Problemas de negocios o estrategia", valor: 5, categoria: "emprendedor" },
                    { texto: "Problemas mecánicos o técnicos", valor: 5, categoria: "practico" },
                    { texto: "Problemas científicos o de investigación", valor: 5, categoria: "investigador" }
                ]
            },
            {
                id: 8,
                pregunta: "¿Qué te gustaría lograr en 10 años?",
                opciones: [
                    { texto: "Ser experto en mi campo", valor: 5, categoria: "analitico" },
                    { texto: "Crear obras o proyectos creativos", valor: 5, categoria: "creativo" },
                    { texto: "Ayudar a muchas personas", valor: 5, categoria: "social" },
                    { texto: "Tener mi propia empresa", valor: 5, categoria: "emprendedor" },
                    { texto: "Construir cosas importantes", valor: 5, categoria: "practico" },
                    { texto: "Hacer un descubrimiento importante", valor: 5, categoria: "investigador" }
                ]
            }
        ];
    }

    guardarResultados() {
        try {
            if (this.perfilUsuario && this.recomendaciones) {
                localStorage.setItem('zentri_perfil', JSON.stringify(this.perfilUsuario));
                localStorage.setItem('zentri_recomendaciones', JSON.stringify(this.recomendaciones.slice(0, 5)));
                localStorage.setItem('total_tests', (parseInt(localStorage.getItem('total_tests') || '0') + 1).toString());
                return true;
            }
        } catch (error) {
            console.error('Error guardando resultados:', error);
        }
        return false;
    }

    cargarResultados() {
        try {
            const perfilGuardado = localStorage.getItem('zentri_perfil');
            const recomendacionesGuardadas = localStorage.getItem('zentri_recomendaciones');
            
            if (perfilGuardado) {
                this.perfilUsuario = JSON.parse(perfilGuardado);
            }
            
            if (recomendacionesGuardadas) {
                this.recomendaciones = JSON.parse(recomendacionesGuardadas);
            }
            
            return this.perfilUsuario;
        } catch (error) {
            console.error('Error cargando resultados:', error);
            return null;
        }
    }

    limpiarResultados() {
        localStorage.removeItem('zentri_perfil');
        localStorage.removeItem('zentri_recomendaciones');
        this.perfilUsuario = null;
        this.recomendaciones = [];
    }
}

// Asegurar que la instancia esté disponible globalmente
if (typeof window !== 'undefined') {
    if (!window.VocacionalAI) {
        window.VocacionalAI = VocacionalAI;
    }
    if (!window.vocacionalAI) {
        window.vocacionalAI = new VocacionalAI();
    }
}