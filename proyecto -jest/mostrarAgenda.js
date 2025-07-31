function mostrarAgenda(reservas) {
  if (!reservas || reservas.length === 0) {
    return "<tr><td colspan='7'>No hay reservas registradas.</td></tr>";
  }

  return reservas.map(reserva => {
    return `
      <tr>
        <td>${reserva.nombre}</td>
        <td>${reserva.telefono}</td>
        <td>${reserva.barbero}</td>
        <td>${reserva.servicio}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.hora}</td>
        <td>${reserva.email}</td>
      </tr>
    `;
  }).join("");
}

module.exports = mostrarAgenda;