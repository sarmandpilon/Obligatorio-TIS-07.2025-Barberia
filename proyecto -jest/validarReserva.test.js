const { validarReserva } = require('./validarReserva');

describe("Validación y creación de reservas", () => {
  const reservaBase = {
    nombre: "Carlos",
    telefono: "099123456",
    barbero: "Pepe",
    servicio: "Corte",
    fecha: "2025-08-01",
    hora: "15:00",
    email: "carlos@mail.com"
  };

  test("Reserva válida se registra correctamente", () => {
    const resultado = validarReserva(reservaBase, []);
    expect(resultado.exito).toBe(true);
    expect(resultado.reserva.nombre).toBe("Carlos");
  });

  test("Falla si el nombre contiene números", () => {
    const datos = { ...reservaBase, nombre: "Car1os" };
    const resultado = validarReserva(datos, []);
    expect(resultado.exito).toBe(false);
    expect(resultado.errores).toContain("El nombre debe contener solo letras.");
  });

  test("Falla si el teléfono contiene letras", () => {
    const datos = { ...reservaBase, telefono: "abc123" };
    const resultado = validarReserva(datos, []);
    expect(resultado.exito).toBe(false);
    expect(resultado.errores).toContain("El teléfono debe contener solo números.");
  });

  test("Falla si el email no contiene '@'", () => {
    const datos = { ...reservaBase, email: "carlosmail.com" };
    const resultado = validarReserva(datos, []);
    expect(resultado.exito).toBe(false);
    expect(resultado.errores).toContain("El correo electrónico debe contener '@'.");
  });

  test("Falla si hay conflicto de barbero, fecha y hora", () => {
    const reservasExistentes = [
      {
        barbero: "Pepe",
        fecha: "2025-08-01",
        hora: "15:00"
      }
    ];
    const resultado = validarReserva(reservaBase, reservasExistentes);
    expect(resultado.exito).toBe(false);
    expect(resultado.errores).toContain("Este barbero ya tiene una reserva en esa fecha y hora.");
  });
});