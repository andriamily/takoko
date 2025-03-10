document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const menuClose = document.getElementById("menu-close");
    const header = document.querySelector("header");
    const body = document.body;
    const content = document.querySelector(".content");
    const footer = document.querySelector("footer");
    const slides = document.querySelector(".slides");
    const dots = document.querySelectorAll(".dot");
    const images = document.querySelectorAll(".image-cover img");

    let slideIndex = 1; // Index du slide actif
    let timer;

    // Fonction pour basculer la sidebar
    function toggleSidebar() {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-active");
    }

    function closeSidebar() {
        if (sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
            body.classList.remove("sidebar-active");
        }
    }

    // Gestionnaire pour les boutons
    if (menuToggle) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleSidebar();
        });
    }

    if (menuClose) {
        menuClose.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleSidebar();
        });
    }

    if (header) header.addEventListener("click", closeSidebar);
    if (content) content.addEventListener("click", closeSidebar);
    if (footer) footer.addEventListener("click", closeSidebar);

    // Empêcher les clics dans la sidebar de la fermer
    if (sidebar) {
        sidebar.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    document.addEventListener("click", function (event) {
        if (
            sidebar &&
            sidebar.classList.contains("active") &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target) &&
            !menuClose.contains(event.target)
        ) {
            closeSidebar();
        }
    });

    // Fonction pour afficher les slides
    function showSlides(n) {
        const allSlides = document.querySelectorAll(".slides .slide"); // Toutes les diapos
        const allDots = document.querySelectorAll(".dot"); // Tous les dots
        const totalSlides = allSlides.length;

        // Boucler les indices des slides
        if (n > totalSlides) slideIndex = 1;
        if (n < 1) slideIndex = totalSlides;

        // Masquer toutes les diapos et désactiver les dots
        allSlides.forEach(slide => (slide.style.display = "none"));
        allDots.forEach(dot => dot.classList.remove("active"));

        // Afficher la diapo active et activer le dot correspondant
        allSlides[slideIndex - 1].style.display = "block";
        allDots[slideIndex - 1].classList.add("active");
    }

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Initialisation des slides
    showSlides(slideIndex);

    // Ajout d'événements pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });

    // Diaporama automatique
    function startAutoSlide() {
        timer = setInterval(() => plusSlides(1), 2000);
    }

    function stopAutoSlide() {
        clearInterval(timer);
    }

    // Arrêter et redémarrer la diapositive automatique au survol
    const imageCover = document.querySelector(".image-cover");
    if (imageCover) {
        imageCover.addEventListener("mouseover", stopAutoSlide);
        imageCover.addEventListener("mouseout", startAutoSlide);
    }

    startAutoSlide();
});

window.addEventListener('scroll', () => {
    console.log('Défilement détecté');
    const currentScroll = window.scrollY;
    console.log('Position actuelle :', currentScroll);
});

let lastScrollTop = 0; // Variable pour stocker la position précédente du défilement
const menuToggle = document.querySelector('.menu-toggle'); // Sélectionnez votre logo

if (menuToggle) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop; // Position actuelle du défilement
        
        if (currentScroll > lastScrollTop) {
            // Défilement vers le bas - cacher le logo
            menuToggle.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut - afficher le logo
            menuToggle.style.transform = 'translateY(0)';
        }

        // Mettre à jour la position précédente de défilement
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Évite les valeurs négatives
    });
}