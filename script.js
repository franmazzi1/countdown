document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("nav-links").classList.toggle("active");
});

let currentIndex = 0;
const sections = document.querySelectorAll("section");

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: "smooth" });
        currentIndex = index;
    }
}

function scrollUp() {
    scrollToSection(currentIndex - 1);
}

function scrollDown() {
    scrollToSection(currentIndex + 1);
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        scrollDown();
    } else if (event.key === "ArrowUp") {
        scrollUp();
    }
});

function enviarEmail(pack) {
    const email = "agenciakaos4@gmail.com";
    const subject = encodeURIComponent(`Consulta sobre ${pack}`);
    const body = encodeURIComponent(
        `Hola, estoy interesado en el pack "${pack}".\n\nMe gustaría recibir más información.\n\nGracias.`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section-container");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => observer.observe(section));
});
