/**
 * ZENTRI VOCACIONAL - Test Vocacional Interactivo
 */

class TestVocacional {
    constructor() {
        if (!window.vocacionalAI) {
            console.error('VocacionalAI no está disponible');
            return;
        }
        this.preguntas = window.vocacionalAI.generarPreguntasTest();
        this.respuestas = [];
        this.preguntaActual = 0;
        this.totalPreguntas = this.preguntas.length;
    }

    iniciarTest() {
        this.respuestas = [];
        this.preguntaActual = 0;
        this.mostrarPregunta();
    }

    mostrarPregunta() {
        const container = document.getElementById('test-container');
        if (!container) return;

        const pregunta = this.preguntas[this.preguntaActual];
        if (!pregunta) return;

        const progreso = ((this.preguntaActual + 1) / this.totalPreguntas) * 100;

        let html = `
            <div class="test-header">
                <h2>Pregunta ${this.preguntaActual + 1} de ${this.totalPreguntas}</h2>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progreso}%"></div>
                </div>
            </div>
            <div class="test-question">
                <h3>${pregunta.pregunta}</h3>
            </div>
            <div class="test-options">
        `;

        pregunta.opciones.forEach((opcion, index) => {
            html += `
                <button class="test-option" onclick="testVocacional.seleccionarOpcion(${index})">
                    ${opcion.texto}
                </button>
            `;
        });

        html += `
            </div>
            <div class="test-navigation">
                ${this.preguntaActual > 0 ? 
                    '<button class="btn-secondary" onclick="testVocacional.preguntaAnterior()">← Anterior</button>' : 
                    '<div></div>'
                }
                <span class="test-counter">${this.preguntaActual + 1}/${this.totalPreguntas}</span>
            </div>
        `;

        container.innerHTML = html;
    }

    seleccionarOpcion(index) {
        const pregunta = this.preguntas[this.preguntaActual];
        const opcion = pregunta.opciones[index];

        this.respuestas[this.preguntaActual] = {
            pregunta: pregunta.id,
            categoria: opcion.categoria,
            valor: opcion.valor
        };

        const opciones = document.querySelectorAll('.test-option');
        opciones.forEach(btn => btn.classList.remove('selected'));
        opciones[index].classList.add('selected');

        setTimeout(() => {
            if (this.preguntaActual < this.totalPreguntas - 1) {
                this.preguntaSiguiente();
            } else {
                this.finalizarTest();
            }
        }, 500);
    }

    preguntaSiguiente() {
        if (this.preguntaActual < this.totalPreguntas - 1) {
            this.preguntaActual++;
            this.mostrarPregunta();
        }
    }

    preguntaAnterior() {
        if (this.preguntaActual > 0) {
            this.preguntaActual--;
            this.mostrarPregunta();
        }
    }

  finalizarTest() {
    if (!window.vocacionalAI) {
        console.error('VocacionalAI no disponible');
        return;
    }

    // Procesar resultados
    const resultados = window.vocacionalAI.procesarTest(this.respuestas);

    const perfil = window.vocacionalAI.perfilUsuario;
    const recomendaciones = window.vocacionalAI.recomendaciones;

    // Guardar temporal (como ya lo haces)
    sessionStorage.setItem('resultados_temp', JSON.stringify({
        perfil: perfil,
        recomendaciones: recomendaciones
    }));

    // 🔹 GUARDAR EN EL USUARIO (PARA EL HISTORIAL)
    if (window.authSystem && authSystem.haySesion()) {

        const resultadoGuardar = {
            perfil: perfil.principal,
            recomendacion: recomendaciones[0]?.nombre || "Sin recomendación"
        };

        authSystem.guardarResultadosUsuario(resultadoGuardar);

        console.log("✅ Test guardado en historial del usuario");
    }

    // Mostrar resultados
    this.mostrarResultadosEnPagina();
}

    mostrarResultadosEnPagina() {
        const container = document.getElementById('test-container');
        const tempData = sessionStorage.getItem('resultados_temp');
        
        if (!tempData) {
            container.innerHTML = `<p>Error al cargar resultados</p>`;
            return;
        }

        const data = JSON.parse(tempData);
        const perfil = data.perfil;
        const recomendaciones = data.recomendaciones;

        const perfilInfo = window.PERFILES_VOCACIONALES[perfil.principal] || {
            nombre: "Personalizado",
            descripcion: "Perfil único determinado por IA",
            icono: "🎯"
        };

        // Ordenar puntajes
        const puntajesOrdenados = Object.entries(perfil.puntajes)
            .sort((a, b) => b[1] - a[1]);

        let puntajesHTML = '';
        puntajesOrdenados.forEach(([tipo, puntaje]) => {
            const nombrePerfil = window.PERFILES_VOCACIONALES[tipo]?.nombre || tipo;
            puntajesHTML += `
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="font-weight: 600;">${nombrePerfil}</span>
                        <span style="color: #4158D0;">${puntaje}%</span>
                    </div>
                    <div style="height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden;">
                        <div style="height: 100%; width: ${puntaje}%; background: linear-gradient(90deg, #4158D0, #C850C0);"></div>
                    </div>
                </div>
            `;
        });

        let carrerasHTML = '';
        recomendaciones.slice(0, 3).forEach(carrera => {
            carrerasHTML += `
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; cursor: pointer;" onclick="window.location.href='carreras.html?detalle=${carrera.id}'">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 700;">${carrera.nombre}</span>
                        <span style="background: #4CAF50; color: white; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem;">⭐ Alta</span>
                    </div>
                    <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">${carrera.descripcion.substring(0, 80)}...</p>
                    <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: #888;">
                        <span>⏱️ ${carrera.duracion}</span>
                        <span>💰 ${carrera.salario_promedio}</span>
                    </div>
                    <div style="margin-top: 0.5rem; color: ${carrera.area_color};">${carrera.area_icono} ${carrera.area}</div>
                </div>
            `;
        });

        container.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎯</div>
                <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #4158D0, #C850C0); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ¡Test completado!
                </h1>
                <!-- Resultados del test -->
                <div style="background: #f8f9fa; padding: 2rem; border-radius: 20px; margin: 2rem 0; text-align: left;">
                    <h2 style="text-align: center; margin-bottom: 2rem; color: #333;">📊 Resultados de la evaluación</h2>
                    
                    <div style="margin-bottom: 2rem;">
                        <div style="text-align: center; margin-bottom: 1rem;">
                            <span style="font-size: 3rem;">${perfilInfo.icono}</span>
                            <h3 style="color: #333;">Perfil ${perfilInfo.nombre}</h3>
                            <p style="color: #666;">${perfilInfo.descripcion}</p>
                        </div>

                        <h4 style="margin: 2rem 0 1rem;">Tus áreas de fortaleza:</h4>
                        ${puntajesHTML}
                    </div>

                    <h4 style="margin: 2rem 0 1rem;">Carreras recomendadas:</h4>
                    ${carrerasHTML}
                </div>

                <button onclick="window.location.href='index.html'" style="background: none; border: 2px solid #ccc; color: #666; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; margin-top: 1rem;">
                    ← Volver al inicio
                </button>
            </div>
        `;
    }
}

// Inicializar test
let testVocacional;
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        testVocacional = new TestVocacional();
        window.testVocacional = testVocacional;
    });
}