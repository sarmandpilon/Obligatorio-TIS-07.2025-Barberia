// ===== SISTEMA DE RESERVAS EN MEMORIA =====
function SistemaReservas() {
    this.reservas = [];

    this.agregarReserva = function(nombre, barbero, fecha, hora, email, telefono) {
        this.reservas.push({ nombre, barbero, fecha, hora, email, telefono });
    };

    this.reservaExiste = function(barbero, fecha, hora) {
        return this.reservas.some(r => r.barbero === barbero && r.fecha === fecha && r.hora === hora);
    };

    this.delDia = function(hoy) {
        return this.reservas.filter(r => r.fecha === hoy);
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
    const formReserva = document.querySelector("#form");
    if (formReserva) {
        formReserva.addEventListener("submit", realizarReserva);
    }

    const formLogin = document.querySelector("#login-form");
    if (formLogin) {
        formLogin.addEventListener("submit", realizarLogin);
    }
}

eventos();

// ===== FUNCIONES =====
function realizarReserva(e) {
    e.preventDefault();

    let nombre = document.querySelector("#name").value.trim();
    let barbero = document.querySelector("#barber").value;
    let fecha = document.querySelector("#date").value;
    let hora = document.querySelector("#time").value;
    let email = document.querySelector("#email").value;
    let telefono = document.querySelector("#phone").value;

    let mensaje = "";

    if (nombre && fecha && hora && email && telefono) {
        if (!fechaValida(fecha)) {
            mensaje = "La fecha seleccionada no es válida.";
        } else if (barbero && miSistema.reservaExiste(barbero, fecha, hora)) {
            mensaje = "Ese barbero ya tiene una reserva en ese horario.";
        } else {
            miSistema.agregarReserva(nombre, barbero, fecha, hora, email, telefono);
            mensaje = `Reserva confirmada para ${nombre} el ${fecha} a las ${hora}.`;
            document.querySelector("#form").reset();
        }
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

function fechaValida(fecha) {
    const hoy = new Date();
    const f = new Date(fecha + 'T00:00');
    if (f <= hoy) return false;
    const dia = f.getDay();
    if (dia === 0 || dia === 6) return false; // fin de semana
    const feriados = [
        '2025-01-01','2025-05-01','2025-07-18','2025-08-25','2025-12-25'
    ];
    return !feriados.includes(fecha);
}

function realizarLogin(e) {
    e.preventDefault();
    const u = document.querySelector('#user').value;
    const p = document.querySelector('#pass').value;
    const cont = document.querySelector('#reservas-dia');
    if (u === 'ADMIN' && p === 'BARBERIA') {
        const hoy = new Date().toISOString().split('T')[0];
        const lista = document.querySelector('#lista-reservas');
        lista.innerHTML = '';
        miSistema.delDia(hoy).forEach(r => {
            const li = document.createElement('li');
            li.textContent = `${r.nombre} - ${r.hora} ${r.barbero ? '('+r.barbero+')':''}`;
            lista.appendChild(li);
        });
        cont.classList.remove('hidden');
    } else {
        alert('Credenciales incorrectas');
    }
}
