class AuthSystem {

constructor(){
this.usuarioActual=null
this.usuarios=this.cargarUsuarios()
this.init()
}

init(){
const sesion=localStorage.getItem("zentri_sesion")

if(sesion){
this.usuarioActual=JSON.parse(sesion)
}
}

cargarUsuarios(){
const data=localStorage.getItem("zentri_usuarios")
return data?JSON.parse(data):[]
}

guardarUsuarios(){
localStorage.setItem("zentri_usuarios",JSON.stringify(this.usuarios))
}

haySesion(){
return this.usuarioActual!=null
}

getUsuarioActual(){
return this.usuarioActual
}

registrar(nombre,email,password){

if(!nombre||!email||!password){
return{success:false,message:"Todos los campos son obligatorios"}
}

if(password.length<6){
return{success:false,message:"La contraseña debe tener mínimo 6 caracteres"}
}

if(this.usuarios.find(u=>u.email===email)){
return{success:false,message:"Este correo ya existe"}
}

const usuario={
id:Date.now(),
nombre:nombre,
email:email,
password:password,
resultados:[]
}

this.usuarios.push(usuario)

this.guardarUsuarios()

return{success:true,message:"Usuario creado correctamente"}

}

login(email,password){

const usuario=this.usuarios.find(
u=>u.email===email&&u.password===password
)

if(!usuario){
return{success:false,message:"Correo o contraseña incorrectos"}
}

this.usuarioActual=usuario

localStorage.setItem("zentri_sesion",JSON.stringify(usuario))

return{success:true,message:"Sesión iniciada"}

}

logout(){
this.usuarioActual=null
localStorage.removeItem("zentri_sesion")
window.location.href="index.html"
}

guardarResultadosUsuario(resultado){

if(!this.usuarioActual){
return
}

const usuario=this.usuarios.find(u=>u.id===this.usuarioActual.id)

if(!usuario){
return
}

if(!usuario.resultados){
usuario.resultados=[]
}

usuario.resultados.push({
fecha:new Date().toLocaleDateString(),
resultado:resultado
})

this.usuarioActual=usuario

localStorage.setItem("zentri_sesion",JSON.stringify(usuario))

this.guardarUsuarios()

console.log("Resultado guardado:", usuario.resultados)

}

getResultadosUsuario(){

if(!this.usuarioActual){
return []
}

const usuario=this.usuarios.find(u=>u.id===this.usuarioActual.id)

if(!usuario || !usuario.resultados){
return []
}

return usuario.resultados

}

recuperarPassword(email){

const usuario=this.usuarios.find(u=>u.email===email)

if(!usuario){
return{success:false,message:"Email no encontrado"}
}

const temp="123456"

usuario.password=temp

this.guardarUsuarios()

return{
success:true,
message:"Contraseña temporal generada",
tempPassword:temp
}

}

}

window.authSystem=new AuthSystem()
