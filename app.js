var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var images = document.getElementsByClassName("hero-image");
var currentImage = 0;
let imageChangeInterval = 6000;
var fadeDuration =
    parseFloat(getComputedStyle(images[0])["transitionDuration"]) * 1000;
var heroDownArrow = document.getElementsByClassName("hero-downArrow")[0];

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

setInterval(() => {
    toggleImage();
}, imageChangeInterval);
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

heroDownArrow.addEventListener("click", function () {
    SmoothVerticalScrolling(window.scrollY, window.innerHeight, 500);
});

//Adapted from: https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
function SmoothVerticalScrolling(startY, endY, time) {
    var incrementCount = (time / 1000) * 60;
    var linearProgress = 0;
    var deltaY = endY - startY;

    while (linearProgress <= 1) {
        linearProgress += 1 / incrementCount;

        setTimeout(
            (y) => {
                window.scrollTo(0, y);
            },
            linearProgress * time,
            easeOutCubic(linearProgress) * deltaY + startY
        );
    }
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}
