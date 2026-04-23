class AsistenteVocacional {

constructor(){

this.apiKey = "sk-5ZLSxR66XQbQtVkOFdF5F7F9Fa5d40E489B599A2BbB5B115";
this.apiURL = "https://api.apiyi.com/v1/chat/completions";

this.carrerasDB = window.CARRERAS_DB || {};

console.log("🤖 Asistente vocacional con IA iniciado");

}


/* =========================
BUSCAR CARRERA
========================= */

buscarCarrera(texto){

texto = texto.toLowerCase();

for(const area in this.carrerasDB){

for(const carrera of this.carrerasDB[area].carreras){

if(texto.includes(carrera.nombre.toLowerCase())){
return carrera;
}

}

}

return null;

}


/* =========================
BUSCAR AREA
========================= */

buscarArea(texto){

texto = texto.toLowerCase();

for(const area in this.carrerasDB){

if(texto.includes(area.toLowerCase())){
return this.carrerasDB[area];
}

}

return null;

}


/* =========================
INFORMACION DE CARRERA
========================= */

infoCarrera(carrera){

return `
Carrera: ${carrera.nombre}

Descripción:
${carrera.descripcion}

Duración:
${carrera.duracion}

Campo laboral:
${carrera.campo_laboral}
`;

}


/* =========================
LISTA DE AREAS
========================= */

generarListaAreas(){

let texto = "";

for(const area in this.carrerasDB){

texto += `\n${area}:`;

this.carrerasDB[area].carreras.forEach(c=>{
texto += `\n- ${c.nombre}`;
});

texto += "\n";

}

return texto;

}


/* =========================
PREGUNTAR A IA
========================= */

async preguntarIA(pregunta){

const carrera = this.buscarCarrera(pregunta);

let contexto = "";

if(carrera){

contexto = this.infoCarrera(carrera);

}else{

contexto = this.generarListaAreas();

}


const respuesta = await fetch(this.apiURL,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + this.apiKey
},
body:JSON.stringify({

model:"gpt-4o",

messages:[
{
role:"system",
content:`
Eres ZENTRI, un asistente vocacional.

SOLO puedes responder usando la información proporcionada.

No inventes carreras.

Carreras disponibles en la página:
${this.generarListaAreas()}

Si el usuario pregunta sobre el test vocacional,
explícale que sirve para descubrir qué área profesional
es más adecuada según sus intereses.
`
},

{
role:"system",
content:contexto
},

{
role:"user",
content:pregunta
}

],

temperature:0.5

})

});

const data = await respuesta.json();

return {

texto:data.choices[0].message.content,

sugerencias:[
"Tecnología",
"Salud",
"Hacer test vocacional",
"Carreras disponibles"
]

};

}


/* =========================
PROCESAR PREGUNTA
========================= */

async procesarPregunta(pregunta){

try{

return await this.preguntarIA(pregunta);

}catch(error){

console.error(error);

return{
texto:"Error conectando con el asistente.",
sugerencias:["Intentar nuevamente"]
};

}

}

}


/* =========================
INICIALIZAR
========================= */

if(typeof window !== "undefined"){

window.asistenteVocacional = new AsistenteVocacional();

}
