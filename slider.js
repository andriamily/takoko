let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto slide
let timer = setInterval(() => {
    plusSlides(1);
}, 5000);

// Stop auto slide on mouse over
document.querySelector(".image-cover").addEventListener("mouseover", () => {
    clearInterval(timer);
});

// Resume auto slide on mouse out
document.querySelector(".image-cover").addEventListener("mouseout", () => {
    timer = setInterval(() => {
        plusSlides(1);
    }, 5000);
});
