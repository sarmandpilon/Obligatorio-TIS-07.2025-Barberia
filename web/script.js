document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push({ name, barber, date, time });
    localStorage.setItem('appointments', JSON.stringify(appointments));

    const confirmation = document.getElementById('confirmation');
    confirmation.textContent = `Reserva confirmada para ${name} con ${barber} el ${date} a las ${time}`;
    confirmation.classList.remove('hidden');
    this.reset();
});
