/**
 * ZENTRI VOCACIONAL - UI del Asistente
 */

class AssistantUI {
    constructor() {
        this.asistente = window.asistenteVocacional;
        this.ventanaAbierta = false;
        this.inicializado = false;
    }

    inicializar() {
        if (this.inicializado) return;
        if (document.getElementById('assistant-button')) return;

        this.crearBoton();
        this.crearVentana();
        this.configurarEventos();
        
        this.inicializado = true;
    }

    crearBoton() {
        const button = document.createElement('button');
        button.id = 'assistant-button';
        button.className = 'assistant-button';
        button.innerHTML = '🎯';
        button.setAttribute('aria-label', 'Abrir asistente');
        document.body.appendChild(button);
        this.boton = button;
    }

    crearVentana() {
        if (document.getElementById('assistant-window')) return;
        
        const ventana = document.createElement('div');
        ventana.id = 'assistant-window';
        ventana.className = 'assistant-window';
        ventana.style.display = 'none';
        
        ventana.innerHTML = `
            <div class="assistant-header">
                <div class="assistant-header-info">
                    <div class="assistant-avatar">🎯</div>
                    <div class="assistant-title">
                        <h3>Asistente Vocacional</h3>
                        <div class="assistant-status">
                            <span class="status-dot"></span>
                            <span>Online</span>
                        </div>
                    </div>
                </div>
                <button class="assistant-close" id="assistant-close">×</button>
            </div>
            <div class="assistant-body" id="assistant-body">
                <div class="welcome-message">
                    <h4>👋 ¡Hola! Soy tu asistente</h4>
                    <p>Pregúntame sobre carreras, universidades o tu perfil.</p>
                </div>
            </div>
            <div class="suggestions-container" id="suggestions-container"></div>
            <div class="assistant-footer">
                <div class="input-container">
                    <input type="text" id="assistant-input" placeholder="Escribe tu mensaje...">
                    <button class="send-button" id="send-message">📤</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(ventana);
        this.ventana = ventana;
    }

    configurarEventos() {
        this.boton.addEventListener('click', () => this.toggleVentana());
        
        const closeBtn = document.getElementById('assistant-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.cerrarVentana());
        
        const sendBtn = document.getElementById('send-message');
        if (sendBtn) sendBtn.addEventListener('click', () => this.enviarMensaje());
        
        const input = document.getElementById('assistant-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.enviarMensaje();
            });
        }
    }

    toggleVentana() {
        this.ventanaAbierta ? this.cerrarVentana() : this.abrirVentana();
    }

    abrirVentana() {
        this.ventana.style.display = 'flex';
        this.ventanaAbierta = true;
        const input = document.getElementById('assistant-input');
        if (input) input.focus();
        this.actualizarSugerencias([
            "¿Qué carreras me recomiendan?",
            "Información sobre medicina",
            "Mejores universidades",
            "Salarios promedio"
        ]);
    }

    cerrarVentana() {
        this.ventana.classList.add('closing');
        setTimeout(() => {
            this.ventana.style.display = 'none';
            this.ventana.classList.remove('closing');
            this.ventanaAbierta = false;
        }, 300);
    }

    async enviarMensaje() {
        const input = document.getElementById('assistant-input');
        if (!input) return;
        
        const mensaje = input.value.trim();
        if (!mensaje) return;
        
        input.value = '';
        this.agregarMensaje(mensaje, 'user');
        this.mostrarTyping();

        try {
            if (!this.asistente) this.asistente = window.asistenteVocacional;
            const respuesta = await this.asistente.procesarPregunta(mensaje);
            this.quitarTyping();
            this.agregarMensaje(respuesta.texto, 'assistant');
            this.actualizarSugerencias(respuesta.sugerencias || []);
        } catch (error) {
            this.quitarTyping();
            this.agregarMensaje('Lo siento, hubo un error. Intenta de nuevo.', 'assistant');
        }
    }

    agregarMensaje(texto, tipo) {
        const body = document.getElementById('assistant-body');
        if (!body) return;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `message ${tipo}`;
        mensajeDiv.innerHTML = `
            <div class="message-avatar">${tipo === 'user' ? '👤' : '🎯'}</div>
            <div class="message-content">
                <div class="message-bubble">${this.formatearTexto(texto)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        body.appendChild(mensajeDiv);
        body.scrollTop = body.scrollHeight;
    }

    mostrarTyping() {
        if (document.getElementById('typing-indicator')) return;
        
        const body = document.getElementById('assistant-body');
        if (!body) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🎯</div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        body.appendChild(typingDiv);
        body.scrollTop = body.scrollHeight;
    }

    quitarTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    actualizarSugerencias(sugerencias) {
        const container = document.getElementById('suggestions-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        sugerencias.slice(0, 4).forEach(sug => {
            const chip = document.createElement('span');
            chip.className = 'suggestion-chip';
            chip.textContent = sug;
            chip.addEventListener('click', () => {
                const input = document.getElementById('assistant-input');
                if (input) {
                    input.value = sug;
                    this.enviarMensaje();
                }
            });
            container.appendChild(chip);
        });
    }

    formatearTexto(texto) {
        return texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.assistantUI = new AssistantUI();
        window.assistantUI.inicializar();
    }, 500);
});