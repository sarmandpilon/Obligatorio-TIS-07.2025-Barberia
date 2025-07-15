// ===== SISTEMA DE RESERVAS EN MEMORIA =====
function SistemaReservas() {
    this.reservas = [];

    this.agregarReserva = function(nombre, barbero, fecha, hora) {
        this.reservas.push({ nombre, barbero, fecha, hora });
    };

    this.listarReservas = function() {
        console.log("Reservas actuales:");
        for (let i = 0; i < this.reservas.length; i++) {
            const r = this.reservas[i];
            console.log(`- ${r.nombre} con ${r.barbero} el ${r.fecha} a las ${r.hora}`);
        }
    };
}

// ===== DECLARACIÓN DE SISTEMA Y EVENTOS =====
let miSistema = new SistemaReservas();

function eventos() {
    document.querySelector("#form").addEventListener("submit", realizarReserva);
}

eventos();

// ===== FUNCIONES =====
function realizarReserva(e) {
    e.preventDefault();

    let nombre = document.querySelector("#name").value.trim();
    let barbero = document.querySelector("#barber").value;
    let fecha = document.querySelector("#date").value;
    let hora = document.querySelector("#time").value;

    let mensaje = "";

    if (nombre && barbero && fecha && hora) {
        miSistema.agregarReserva(nombre, barbero, fecha, hora);
        mensaje = `Reserva confirmada para ${nombre} con ${barbero} el ${fecha} a las ${hora}.`;
        document.querySelector("#form").reset();
    } else {
        mensaje = "Por favor completá todos los campos.";
    }

    mostrarMensajeConfirmacion(mensaje);
    miSistema.listarReservas(); // Solo para depuración
}

function mostrarMensajeConfirmacion(mensaje) {
    let div = document.querySelector("#confirmation");
    div.textContent = mensaje;
    div.classList.remove("hidden");
}
