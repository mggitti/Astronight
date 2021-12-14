var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var images = document.getElementsByClassName("hero-image");
var currentImage = 0;
let imageChangeInterval = 6000;
var fadeDuration = parseFloat(getComputedStyle(images[0])['transitionDuration']) * 1000;

for (let i = 0; i < faqCollapsibles.length; i++) {
    faqCollapsibles[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

setInterval(() => { toggleImage() }, imageChangeInterval);
images[currentImage].style.opacity = 1;

function toggleImage() {
    currentImage = (currentImage + 1) % images.length;

    for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = 0;
    }

    setTimeout(() => {
        images[currentImage].style.opacity = 1;
    }, fadeDuration);
}