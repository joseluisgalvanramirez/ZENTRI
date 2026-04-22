// REGISTRO
function registrarUsuario(nombre, email, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    alert("El usuario ya existe");
    return;
  }

  const nuevoUsuario = { nombre, email, password };
  usuarios.push(nuevoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Registro exitoso");
  window.location.href = "login.html";
}

// LOGIN
function loginUsuario(email, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(
    u => u.email === email && u.password === password
  );

  if (usuario) {
    localStorage.setItem("sesion", JSON.stringify(usuario));
    window.location.href = "perfil.html";
  } else {
    alert("Credenciales incorrectas");
  }
}
