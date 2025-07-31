function validarCredenciales(nombre, contrasnia, listaDeUsuarios) {
  return listaDeUsuarios.some(usuario =>
    usuario.nombre === nombre && usuario.contrasnia === contrasnia
  );
}

module.exports = validarCredenciales;