var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var images = document.getElementsByClassName("hero-image");
var currentImage = 0;
let imageChangeInterval = 6000;
var fadeDuration =
    parseFloat(getComputedStyle(images[0])["transitionDuration"]) * 1000;
var navbar = document.getElementsByClassName("navbar")[0];
var arrow = document.getElementsByClassName("hero-arrow")[0];
var arrowAnimationDuration = 6000;
var arrowAnimationTimeOut = 250;
var arrowAnimationDelay = 2000;

var fullscreenImageViewBackground = document.getElementsByClassName(
    "fullscreenImageView-background"
)[0];
var fullscreenImageView = document.getElementsByClassName(
    "fullscreenImageView"
)[0];

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

arrow.addEventListener("click", function () {
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

var restartAnimation = true;
var animationActive = false;

triggerArrowAnimation();
window.addEventListener("scroll", triggerArrowAnimation);

function triggerArrowAnimation() {
    restartAnimation = scrollY == 0;

    if (scrollY == 0) {
        setTimeout(() => {
            if (scrollY == 0 && !animationActive) {
                animateArrow();
            }
        }, arrowAnimationDelay);
    }
}
function animateArrow() {
    animationActive = true;

    //SubAnimations
    arrowAnimateIn();
    setTimeout(arrowAnimateOut, arrowAnimationDuration * 0.5);

    //Completion
    setTimeout(() => {
        animationActive = false;
    }, arrowAnimationDuration);

    //Auto Restart
    setTimeout(() => {
        if (restartAnimation) {
            animateArrow();
        }
    }, arrowAnimationDuration + arrowAnimationTimeOut);
}
function arrowAnimateIn() {
    arrow.classList.add("animateIn");
}
function arrowAnimateOut() {
    arrow.classList.remove("animateIn");
    arrow.classList.add("animateOut");
    setTimeout(() => {
        arrow.classList.remove("animateOut");
    }, arrowAnimationDuration * 0.5);
}

window.addEventListener("scroll", hideFullscreenImage);
var fullscreenImageActive = false;
function showFullscreenImage(imagePath) {
    if (window.innerWidth < 500) return;
    if (fullscreenImageActive) return;

    fullscreenImageActive = true;
    fullscreenImageView.src = imagePath;
    fullscreenImageViewBackground.classList.add("active");
}
function hideFullscreenImage() {
    if (!fullscreenImageActive) return;

    fullscreenImageActive = false;
    fullscreenImageViewBackground.classList.remove("active");
}

function jumpToRegistrationForm() {
    window.location.href = "https://form.jotform.com/220952533108047";
}
