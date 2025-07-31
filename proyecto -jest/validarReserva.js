class Reserva {
  constructor(nombre, telefono, barbero, servicio, fecha, hora, email) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.barbero = barbero;
    this.servicio = servicio;
    this.fecha = fecha;
    this.hora = hora;
    this.email = email;
  }
}

function validarReserva(datos, reservasExistentes) {
  const errores = [];

  if (datos.nombre === "" || /\d/.test(datos.nombre)) {
    errores.push("El nombre debe contener solo letras.");
  }

  if (datos.telefono === "" || isNaN(datos.telefono)) {
    errores.push("El teléfono debe contener solo números.");
  }

  if (datos.email === "" || !datos.email.includes("@")) {
    errores.push("El correo electrónico debe contener '@'.");
  }

  const conflicto = reservasExistentes.some(reserva =>
    reserva.barbero === datos.barbero &&
    reserva.fecha === datos.fecha &&
    reserva.hora === datos.hora
  );

  if (conflicto) {
    errores.push("Este barbero ya tiene una reserva en esa fecha y hora.");
  }

  if (errores.length > 0) {
    return { exito: false, errores };
  }

  const nuevaReserva = new Reserva(
    datos.nombre,
    datos.telefono,
    datos.barbero,
    datos.servicio,
    datos.fecha,
    datos.hora,
    datos.email
  );

  return { exito: true, reserva: nuevaReserva };
}

module.exports = { validarReserva, Reserva };