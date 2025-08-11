document.addEventListener("DOMContentLoaded", () => {

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

  class Usuario {
    constructor(nombre, contrasnia) {
      this.nombre = nombre;
      this.contrasnia = contrasnia;
    }
  }

  let listaDeUsuarios = [];
  let usuarioAdministrador = new Usuario("admin", "Barberia");
  listaDeUsuarios.push(usuarioAdministrador);

  let listaDeReservas = JSON.parse(localStorage.getItem("misReservas")) || [];

  let formularioDeReserva = document.getElementById("formulario-reserva");
  if (formularioDeReserva) {
    formularioDeReserva.addEventListener("submit", function (evento) {
      evento.preventDefault();

      let campoNombre = document.getElementById("nombre").value;
      let campoTelefono = document.getElementById("telefono").value;
      let campoBarbero = document.getElementById("barbero").value;
      let campoServicio = document.getElementById("servicio").value;
      let campoFecha = document.getElementById("fecha").value;
      let campoHora = document.getElementById("hora").value;
      let campoEmail = document.getElementById("email").value;

      
      // Validar nombre: que no esté vacío y no tenga números
      if (campoNombre === "" || /\d/.test(campoNombre)) {
        alert("El nombre debe contener solo letras.");
        return;
      }

      // Validar teléfono: que no esté vacío y tenga solo números
      if (campoTelefono === "" || isNaN(campoTelefono)) {
        alert("El teléfono debe contener solo números.");
        return;
      }

      // Validar email: que no esté vacío y contenga '@'
      if (campoEmail === "" || !campoEmail.includes("@")) {
        alert("El correo electrónico debe contener '@'.");
        return;
      }
      
      let hayConflicto = false;

      for (let i = 0; i < listaDeReservas.length; i++) {
        let reservaExistente = listaDeReservas[i];
        if (
          reservaExistente.barbero === campoBarbero &&
          reservaExistente.fecha === campoFecha &&
          reservaExistente.hora === campoHora
        ) {
          hayConflicto = true;
        }
      }

      if (hayConflicto) {
        alert("Este barbero ya tiene una reserva en esa fecha y hora.");
        return;
      }

      let nuevaReserva = new Reserva(
        campoNombre,
        campoTelefono,
        campoBarbero,
        campoServicio,
        campoFecha,
        campoHora,
        campoEmail
      );

      listaDeReservas.push(nuevaReserva);
      localStorage.setItem("misReservas", JSON.stringify(listaDeReservas));

      document.getElementById("confirmation").classList.remove("hidden");
      document.getElementById("confirmation").innerText = "Reserva registrada correctamente.";
      formularioDeReserva.reset();
    });
  }


  function iniciarSesion(evento) {
    evento.preventDefault();

    let textoUsuario = document.getElementById("usuario").value;
    let textoContrasenia = document.getElementById("password").value;

    let usuarioCorrecto = false;

    listaDeUsuarios.forEach(function (usuario) {
      if (usuario.nombre === textoUsuario && usuario.contrasnia === textoContrasenia) {
        usuarioCorrecto = true;
      }
    });

    if (usuarioCorrecto) {
      sessionStorage.setItem("usuarioLogueado", textoUsuario);
      window.location.href = "agenda.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  }

  let formularioDeLogin = document.getElementById("formulario-login");
  if (formularioDeLogin && document.getElementById("usuario")) {
    formularioDeLogin.addEventListener("submit", iniciarSesion);
  }

  function mostrarTablaDeReservas() {
    let tablaDeReservas = document.getElementById("tabla-reservas");
    if (!tablaDeReservas) return;

    if (listaDeReservas.length === 0) {
      tablaDeReservas.innerHTML = "<tr><td colspan='7'>No hay reservas registradas.</td></tr>";
    } else {
      tablaDeReservas.innerHTML = "";

      for (let i = 0; i < listaDeReservas.length; i++) {
        let reserva = listaDeReservas[i];
        let fila = "<tr>";
        fila += "<td>" + reserva.nombre + "</td>";
        fila += "<td>" + reserva.telefono + "</td>";
        fila += "<td>" + reserva.barbero + "</td>";
        fila += "<td>" + reserva.servicio + "</td>";
        fila += "<td>" + reserva.fecha + "</td>";
        fila += "<td>" + reserva.hora + "</td>";
        fila += "<td>" + reserva.email + "</td>";
        fila += "</tr>";
        tablaDeReservas.innerHTML += fila;
      }
    }
  }


  if (window.location.pathname.includes("agenda.html")) {
    let usuarioActual = sessionStorage.getItem("usuarioLogueado");
    if (usuarioActual !== "admin") {
      window.location.href = "login.html";
    } else {
      mostrarTablaDeReservas();
    }
  }

});

let botonCerrarSesion = document.getElementById("boton-cerrar-sesion");
if (botonCerrarSesion) {
  botonCerrarSesion.addEventListener("click", function (evento) {
    evento.preventDefault();
    sessionStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });
}

// Funcionalidad del menú hamburger - Versión simplificada y funcional
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script cargado - Iniciando menú hamburger');

  const botonMenu = document.getElementById('boton-menu');
  const menuNavegacion = document.getElementById('menu-navegacion');

  console.log('Botón de menú:', botonMenu);
  console.log('Menú de navegación:', menuNavegacion);

  if (botonMenu && menuNavegacion) {
    console.log('Elementos encontrados, configurando eventos');

    // Toggle del menú al hacer clic en el botón hamburger
    botonMenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Click en botón de menú');
      menuNavegacion.classList.toggle('active');
      console.log('Menú activo:', menuNavegacion.classList.contains('active'));
    });

    // Cerrar el menú cuando se hace clic en un enlace
    const navLinks = menuNavegacion.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Click en enlace, cerrando menú');
        menuNavegacion.classList.remove('active');
      });
    });

    // Cerrar el menú cuando se hace clic fuera de él
    document.addEventListener('click', function(event) {
      const clickDentroDelMenu = botonMenu.contains(event.target) || menuNavegacion.contains(event.target);
      if (!clickDentroDelMenu && menuNavegacion.classList.contains('active')) {
        console.log('Click fuera del menú, cerrando');
        menuNavegacion.classList.remove('active');
      }
    });

    // Cerrar el menú al cambiar el tamaño de la ventana (si se hace más grande)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menuNavegacion.classList.remove('active');
      }
    });
  } else {
    console.log('No se encontraron los elementos del menú');
  }
});

