let countdown;
let notifyEnabled = false;

// Botón para activar notificaciones
document.getElementById("notify").addEventListener("click", () => {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            notifyEnabled = true;
            alert("Notificaciones activadas.");
            scheduleEvent(); // Agregar evento al calendario
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    notifyEnabled = true;
                    alert("Notificaciones activadas.");
                    scheduleEvent(); // Agregar evento al calendario
                } else {
                    alert("No se han activado las notificaciones.");
                }
            });
        } else {
            alert("Las notificaciones están deshabilitadas.");
        }
    } else {
        alert("Tu navegador no admite notificaciones.");
    }
});

// Configuración de la cuenta regresiva
const countDownDate = new Date("March 1, 2025 12:00:00").getTime();

// Actualiza el contador cada segundo
let x = setInterval(() => {
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

    // Si la cuenta regresiva ha terminado
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Ya viene el KAOS";
        if (notifyEnabled) sendNotification();
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
        alert("¡El KAOS ha llegado! Entra a ver las novedades que hay.");
    }
}

// Función para programar un evento en el calendario
function scheduleEvent() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        downloadICSFile(); // iOS: Descarga un archivo .ics
    } else {
        addGoogleCalendarEvent(); // Android & Desktop: Agrega a Google Calendar
    }
}

// Función para agregar un evento en Google Calendar
function addGoogleCalendarEvent() {
    const title = encodeURIComponent("¡El KAOS ha llegado!");
    const details = encodeURIComponent("Entra a ver las novedades que hay.");
    const location = encodeURIComponent("https://tu-sitio.com");

    let startDate = new Date(countDownDate).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let endDate = new Date(countDownDate + 30 * 60000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;

    window.open(googleCalendarUrl, "_blank");
}

// Función para descargar un archivo .ics para Apple Calendar
function downloadICSFile() {
    const eventTitle = "¡El KAOS ha llegado!";
    const eventDescription = "Entra a ver las novedades que hay.";
    const eventLocation = "https://tu-sitio.com";

    let startDate = new Date(countDownDate).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let endDate = new Date(countDownDate + 30 * 60000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "evento.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
