let countdown;
let notifyEnabled = false;

// Obtener referencia al botón de notificación
const notifyButton = document.getElementById("notify");

// Solicitar permiso para las notificaciones y agregar al calendario
notifyButton.addEventListener("click", () => {
    if (Notification.permission === "granted") {
        notifyEnabled = true;
        alert("Notificaciones activadas.");
        addGoogleCalendarEvent(); 
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                notifyEnabled = true;
                alert("Notificaciones activadas.");
                addGoogleCalendarEvent(); 
            } else {
                alert("No se han activado las notificaciones.");
            }
        });
    } else {
        alert("Las notificaciones están deshabilitadas.");
    }
});

// Establece la fecha y hora de la cuenta regresiva
const countDownDate = new Date("March 1, 2025 12:00:00").getTime();

// Actualiza el contador cada segundo
let x = setInterval(function () {
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

    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Ya viene el KAOS";

        
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

// Función para agregar evento a Google Calendar
function addGoogleCalendarEvent() {
    const title = encodeURIComponent("¡El KAOS ha llegado!");
    const details = encodeURIComponent("Entra a ver las novedades que hay.");
    const location = encodeURIComponent("https://tu-sitio.com");

    
    let eventDate = new Date(countDownDate);
    let startDate = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; 

    
    let endDate = new Date(eventDate.getTime() + 30 * 60000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;

    window.open(url, "_blank");
}
