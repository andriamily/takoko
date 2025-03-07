document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const menuClose = document.getElementById("menu-close");
    const header = document.querySelector("header");
    const body = document.body;
    const content = document.querySelector(".content");
    const footer = document.querySelector("footer");
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const images = document.querySelectorAll('.image-cover img');

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

    if (menuToggle) {
        menuToggle.addEventListener("click", function(event) {
            event.stopPropagation();
            toggleSidebar();
        });
    }

    if (menuClose) {
        menuClose.addEventListener("click", function(event) {
            event.stopPropagation();
            toggleSidebar();
        });
    }

    if (header) {
        header.addEventListener("click", closeSidebar);
    }

    if (content) {
        content.addEventListener("click", closeSidebar);
    }

    if (footer) {
        footer.addEventListener("click", closeSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    }

    document.addEventListener("click", function(event) {
        if (sidebar && sidebar.classList.contains("active") && !sidebar.contains(event.target) && !menuToggle.contains(event.target) && !menuClose.contains(event.target)) {
            closeSidebar();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides.style.transition = 'transform 0.5s ease-in-out'; // Rétablir l'animation de transition
            slides.style.transform = `translateX(-${index * (100 / 3)}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            slides.style.transition = 'transform 0.5s ease-in-out'; // Rétablir l'animation de transition
            slides.style.transform = `translateX(-${index * (100 / 3)}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
        });
    });
});


let slideIndex = 1; // Commence à 1 pour le petit slide
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".small-slide .slide");
    let largeSlide = document.querySelector(".large-slide .slide");
    let largeSlideImg = largeSlide.querySelector("img");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all small slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Remove the active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide in the large slide
    let currentSlideImg = slides[slideIndex - 1].querySelector("img").src;
    if (!largeSlideImg) {
        largeSlide.innerHTML = `<img src="${currentSlideImg}" alt="Slide ${slideIndex}">`;
    } else {
        largeSlideImg.src = currentSlideImg;
        largeSlideImg.alt = `Slide ${slideIndex}`;
    }

    // Show the next three slides in the small slides
    for (i = 0; i < 3; i++) {
        let smallSlideIndex = (slideIndex + i - 1) % slides.length;
        slides[smallSlideIndex].style.display = "flex";
    }

    dots[slideIndex - 1].className += " active";

    // Add animation with GSAP
    gsap.fromTo(largeSlide, { opacity: 0 }, { opacity: 1, duration: 1 });
}



// Diapositive automatique
let timer = setInterval(() => {
    plusSlides(1);
}, 5000);

// Arrêter la diapositive automatique au survol
document.querySelector(".image-cover").addEventListener("mouseover", () => {
    clearInterval(timer);
});

// Reprendre la diapositive automatique en sortie de survol
document.querySelector(".image-cover").addEventListener("mouseout", () => {
    timer = setInterval(() => {
        plusSlides(1);
    }, 4000);
});

