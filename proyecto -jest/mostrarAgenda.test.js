const mostrarAgenda = require('./mostrarAgenda');

describe("mostrarAgenda", () => {
  test("devuelve mensaje cuando no hay reservas", () => {
    const html = mostrarAgenda([]);
    expect(html).toContain("No hay reservas registradas");
  });

  test("genera una fila por cada reserva", () => {
    const reservas = [
      {
        nombre: "Ana",
        telefono: "099111111",
        barbero: "Carlos",
        servicio: "Corte",
        fecha: "2025-08-10",
        hora: "10:00",
        email: "ana@mail.com"
      },
      {
        nombre: "Luis",
        telefono: "099222222",
        barbero: "Pepe",
        servicio: "Barba",
        fecha: "2025-08-11",
        hora: "11:00",
        email: "luis@mail.com"
      }
    ];

    const html = mostrarAgenda(reservas);
    expect(html).toContain("<td>Ana</td>");
    expect(html).toContain("<td>099111111</td>");
    expect(html).toContain("<td>Pepe</td>");
    expect((html.match(/<tr>/g) || []).length).toBe(2); // dos filas
  });
});