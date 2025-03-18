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
        slideIndex += n; // Incrémenter ou décrémenter l'indice
        showSlides(slideIndex); // Mettre à jour les slides
    }

    function currentSlide(n) {
        slideIndex = n; // Définit directement l'indice actif
        showSlides(slideIndex); // Mettre à jour les slides
    }

    // Initialisation des slides
    showSlides(slideIndex);

    // Ajout d'événements pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });

    // Diaporama automatique
    function startAutoSlide() {
        timer = setInterval(() => plusSlides(1), 10000);
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

    // Événements pour les flèches
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");

    if (leftArrow) {
        leftArrow.addEventListener("click", () => plusSlides(-1)); // Flèche gauche
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => plusSlides(1)); // Flèche droite
    }
});

window.addEventListener('scroll', () => {
    console.log('Défilement détecté');
    const currentScroll = window.scrollY;
    console.log('Position actuelle :', currentScroll);
});



// Enregistrer le plugin TextPlugin
gsap.registerPlugin(TextPlugin);

// Variables pour le texte
const texteElement = document.getElementById("monTexte");

// Liste de couleurs pour l'effet multicolore
const couleurs = ["red", "blue", "green", "orange", "purple", "yellow"];

// Fonction pour démarrer l'effet multicolore clignotant
function startMulticolore() {
    setInterval(() => {
        const couleurActuelle = couleurs[Math.floor(Math.random() * couleurs.length)];
        texteElement.style.color = couleurActuelle;
    }, 100); // Intervalle de changement de couleur (500 ms)
}

// Animation d'écriture avec GSAP
gsap.to(texteElement, {
    duration: 3, // Durée de l'écriture
    text: "takoko consulting", // Texte affiché
    ease: "power1.out", // Animation fluide
    onUpdate: function () {
        // Changer la couleur du texte
        const couleurActuelle = couleurs[Math.floor(Math.random() * couleurs.length)];
        texteElement.style.color = couleurActuelle;
    },
    onComplete: function () {
        // Lancer ou continuer l'effet multicolore après la fin de l'écriture
        startMulticolore();
    }
});




// Enregistrer les plugins GSAP et ScrollTrigger
gsap.registerPlugin(TextPlugin, ScrollTrigger);

// Fonction pour animer un texte avec un curseur clignotant intégré
function animerTexteAvecCurseur(id, texte, duree, suivant) {
    const texteElement = document.getElementById(id);

    // Initialiser une variable pour suivre l'état du curseur
    let afficherCurseur = true;

    // Ajouter un curseur clignotant pendant l'animation
    const curseurInterval = setInterval(() => {
        if (afficherCurseur) {
            texteElement.textContent += "_"; // Ajouter un curseur
        } else {
            texteElement.textContent = texteElement.textContent.replace(/_$/, ""); // Retirer le curseur
        }
        afficherCurseur = !afficherCurseur; // Alterner entre visible et invisible
    }, 500); // Intervalle de clignotement (500ms)

    // Animation du texte avec GSAP
    gsap.to(texteElement, {
        duration: duree,
        text: texte, // Texte à animer
        ease: "power1.out",
        onUpdate: function () {
            // Assurer que le curseur clignote pendant la mise à jour
            if (!texteElement.textContent.endsWith("_")) {
                texteElement.textContent += "_";
            }
        },
        onComplete: function () {
            clearInterval(curseurInterval); // Arrêter le clignotement du curseur
            texteElement.textContent = texte; // Supprimer définitivement le curseur à la fin
            if (suivant) suivant(); // Lancer l'animation suivante
        }
    });
}

// Animation pour abtxt1 avec ScrollTrigger
function animerTexte1() {
    animerTexteAvecCurseur(
        "abtxt1",
        "Nous sommes un groupe d’experts composé de plusieurs consultants individuels pluridisciplinaires et débordant d’idées originales.",
        10,
        animerTexte2 // Lancer l'animation de abtxt2 après abtxt1
    );
}

// Animation pour abtxt2
function animerTexte2() {
    animerTexteAvecCurseur(
        "abtxt2",
        "Nous fusionnons passion et expertise pour offrir des solutions de pointe. Pour ceux qui cherchent à optimiser leur projet.",
        10,
        animerTexte3 // Lancer l'animation de abtxt3 après abtxt2
    );
}

// Animation pour abtxt2
function animerTexte3() {
    animerTexteAvecCurseur(
        "abtxt3",
            "Notre capacité à transformer des données complexes en informations exploitables et à concevoir des solutions innovantes fait de nous le partenaire idéal.",
        10,
        animerTexte4 // Lancer l'animation de abtxt3 après abtxt2
    );
}

// Animation pour abtxt3
function animerTexte4() {
    animerTexteAvecCurseur(
        "abtxt4",
        "Découvrez comment nos idées originales et notre expertise peuvent transformer vos projets en solutions impactantes et efficaces.",
        10,
        null // Pas d'animation suivante
    );
}

// Lancer l'animation pour abtxt1 avec ScrollTrigger
gsap.to("#abtxt1", {
    scrollTrigger: {
        trigger: "#abtxt1", // L'élément déclencheur
        start: "top bottom", // Déclenchement lorsque abtxt1 est centré dans l'écran
        toggleActions: "play none none none", // Joue l'animation une seule fois
        markers: false // Ajouter des marqueurs pour le débogage
    },
    onStart: animerTexte1 // Démarrer l'animation de abtxt1 au défilement
});



// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation pour chaque paragraphe
gsap.from(".texteimapparagraphe1", {
    scrollTrigger: {
        trigger: "#texteimap", // Lancer l'animation lorsque #texteimap est visible
        start: "top center", // Commence lorsque l'élément entre dans le centre de l'écran
        toggleActions: "play none none none" // Lancer une seule fois
    },
    x: "-100%", // Slide-in depuis la gauche
    opacity: 1, // Rendre visible
    duration: 2.5
});

gsap.from(".texteimapparagraphe2", {
    scrollTrigger: {
        trigger: "#texteimap",
        start: "top center",
        toggleActions: "play none none none"
    },
    x: "100%", // Slide-in depuis la droite
    opacity: 1,
    duration: 2.5,
    delay: 0.5 // Retard après le 1er paragraphe
});

gsap.from(".texteimapparagraphe3", {
    scrollTrigger: {
        trigger: "#texteimap",
        start: "top center",
        toggleActions: "play none none none"
    },
    x: "-100%", // Slide-in depuis la gauche
    opacity: 1,
    duration: 2.5,
    delay: 1 // Retard après le 2e paragraphe
});

gsap.from(".texteimapparagraphe4", {
    scrollTrigger: {
        trigger: "#texteimap",
        start: "top center",
        toggleActions: "play none none none"
    },
    x: "100%", // Slide-in depuis la droite
    opacity: 1,
    duration: 2.5,
    delay: 1.5, // Retard après le 3e paragraphe
    onComplete: function() {
        // Une fois que l'animation du dernier paragraphe est terminée
        document.querySelector("#texteimap").style.backgroundImage = "none";
        console.log("L'arrière-plan a été supprimé !");
    }
});




// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation pour chaque paragraphe
gsap.from(".servAreaparagraphe1", {
    scrollTrigger: {
        trigger: "#servArea", // Déclencheur basé sur l'élément #servArea
        start: "top bottom", // Déclenche l'animation lorsque le haut de #servArea atteint le bas de la fenêtre
        toggleActions: "play none none none", // Lancer une seule fois
    },
    y: "100%", // Slide-in depuis le bas
    opacity: 0, // Commence invisible
    duration: 3
});

gsap.from(".servAreaparagraphe2", {
    scrollTrigger: {
        trigger: "#servArea",
        start: "top bottom",
        toggleActions: "play none none none"
    },
    y: "100%", // Slide-in depuis le bas
    opacity: 0,
    duration: 3,
    delay: 0.5 // Retard après le 1er paragraphe
});

gsap.from(".servAreaparagraphe3", {
    scrollTrigger: {
        trigger: "#servArea",
        start: "top bottom",
        toggleActions: "play none none none"
    },
    y: "100%", // Slide-in depuis le bas
    opacity: 0,
    duration: 3,
    delay: 1 // Retard après le 2e paragraphe
});

gsap.from(".servAreaparagraphe4", {
    scrollTrigger: {
        trigger: "#servArea",
        start: "top bottom",
        toggleActions: "play none none none"
    },
    y: "100%", // Slide-in depuis le bas
    opacity: 0,
    duration: 3,
    delay: 1.5, // Retard après le 3e paragraphe
    onComplete: function() {
        // Une fois que l'animation du dernier paragraphe est terminée
        document.querySelector("#servArea").style.backgroundImage = "none";
        console.log("L'arrière-plan a été supprimé !");
    }
});

