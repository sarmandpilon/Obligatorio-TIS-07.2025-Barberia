const validarCredenciales = require('./validarCredenciales');

describe('validarCredenciales', () => {
  const lista = [
    { nombre: 'admin', contrasnia: 'Barberia' },
  ];

  test('usuario correcto', () => {
    expect(validarCredenciales('admin', 'Barberia', lista)).toBe(true);
  });

  test('usuario incorrecto', () => {
    expect(validarCredenciales('pepe', 'Barberia', lista)).toBe(false);
  });

  test('contraseña incorrecta', () => {
    expect(validarCredenciales('admin', '999', lista)).toBe(false);
  });
});