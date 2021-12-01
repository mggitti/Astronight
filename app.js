var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var images = document.getElementsByClassName("hero-image");
let imageChangeInterval = 3000;
var currentImage = 0;

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
toggleImage();

function toggleImage() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    images[currentImage].style.display = "flex";

    currentImage = (currentImage + 1) % images.length;
}