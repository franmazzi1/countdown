let countdown;
let notifyEnabled = false;

// Solicitar permiso para las notificaciones
document.getElementById("notify").addEventListener("click", () => {
    if (Notification.permission === "granted") {
        notifyEnabled = true;
        alert("Notificaciones activadas.");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notifyEnabled = true;
                alert("Notificaciones activadas.");
            } else {
                alert("No se han activado las notificaciones.");
            }
        });
    } else {
        alert("Las notificaciones están deshabilitadas.");
    }
});

// Establece la fecha y hora de la cuenta regresiva
const countDownDate = new Date("February 17, 2025 23:10:00").getTime();

// Actualiza el contador cada segundo
let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = (days < 10 ? "0" : "") + days;
    document.getElementById("hours").innerHTML = (hours < 10 ? "0" : "") + hours;
    document.getElementById("minutes").innerHTML = (minutes < 10 ? "0" : "") + minutes;
    document.getElementById("seconds").innerHTML = (seconds < 10 ? "0" : "") + seconds;

    // Si la cuenta regresiva ha terminado, mostrar mensaje y enviar notificación
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Ya viene el KAOS";
        
        // Enviar notificación si está activada
        if (notifyEnabled) {
            sendNotification();
        }
    }
}, 1000);

// Función para enviar una notificación
function sendNotification() {
    if (Notification.permission === "granted") {
        new Notification("¡El KAOS ha llegado!", {
            body: "Entra a ver las novedades que hay",
            icon: "./resources/KAOS3.png"
        });
    } else {
        console.error("No se puede enviar la notificación. Permiso denegado.");
    }
}
