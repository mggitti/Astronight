var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var images = document.getElementsByClassName("hero-image");
var currentImage = 0;
let imageChangeInterval = 6000;
var fadeDuration =
    parseFloat(getComputedStyle(images[0])["transitionDuration"]) * 1000;
var heroDownArrow = document.getElementsByClassName("hero-downArrow")[0];
var navbar = document.getElementsByClassName("navbar")[0];

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
    SmoothVerticalScrolling(window.scrollY, window.innerHeight - 80, 750);
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

//NavBar
window.addEventListener("scroll", () => {
    if (window.scrollY < window.innerHeight / 2) {
        navbar.style.opacity = 0;
    } else {
        navbar.style.opacity = 1;
    }
});

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar-menu");

// Display Mobile Menu
const toggleMobileMenu = () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
};
const dismissMobileMenu = () => {
    menu.classList.remove("is-active");
    menuLinks.classList.remove("active");
};

menu.addEventListener("click", toggleMobileMenu);
menuLinks.addEventListener("click", dismissMobileMenu);
window.addEventListener("scroll", dismissMobileMenu);

//Show arrow after a period of inactivity on the hero scene

function showDownwardArrow() {
    if (heroDownArrow.style.opacity != 1) heroDownArrow.style.opacity = 1;
}
function hideDownwardArrow() {
    if (heroDownArrow.style.opacity != 0) heroDownArrow.style.opacity = 0;
}

setInterval(() => {
    if (scrollY == 0) {
        showDownwardArrow();
    }
}, 4000);
window.addEventListener("scroll", hideDownwardArrow);

function copyMailToClipboard() {
    navigator.clipboard.writeText("daniel.gruber@chgts.de");
    alert(
        'Unsere Email "daniel.gruber@chgts.de" wurde in ihre Zwischenablage kopiert'
    );
}
