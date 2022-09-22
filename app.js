var faqCollapsibles = document.getElementsByClassName("faq-entry-header");
var heroImage = document.getElementsByClassName("hero-image")[0];
var currentImage = 0;
let imageChangeInterval = 6000;
var fadeDuration =
    parseFloat(getComputedStyle(heroImage)["transitionDuration"]) * 1000;
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

var nextHeroImage = new Image();
var currentHeroImageIndex = 0;
var heroImages = [
    {
        name: "andromeda.jpg",
        cover: true,
    },
    {
        name: "blackhole2.jpg",
        cover: true,
    },
    {
        name: "jupiter.jpg",
        cover: false,
    },
    {
        name: "hercules.jpg",
        cover: true,
    },
    {
        name: "star.jpg",
        cover: true,
    },
    {
        name: "pleiades.jpg",
        cover: true,
    },
    {
        name: "blackhole.jpg",
        cover: true,
    },
    {
        name: "starBirth3.jpg",
        cover: true,
    },
    {
        name: "stars.jpg",
        cover: true,
    },
    {
        name: "galaxy.jpg",
        cover: true,
    },
    {
        name: "saturn.jpg",
        cover: false,
    },
    {
        name: "mars.png",
        cover: false,
    },
    {
        name: "starbirth2.jpg",
        cover: true,
    },
    {
        name: "starBirth.jpg",
        cover: true,
    },
];

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

heroImageLoop();
function heroImageLoop() {
    showHeroImage();
    loadNextImage();

    setTimeout(() => {
        hideHeroImage();
        setTimeout(() => {
            switchToNextImage();
            heroImageLoop();
        }, fadeDuration);
    }, imageChangeInterval);
}

function loadNextImage() {
    var nextImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
    nextHeroImage.src = "images/heroImages/" + heroImages[nextImageIndex].name;
}
function switchToNextImage() {
    currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;

    heroImage.src = nextHeroImage.src;
    if (heroImages[currentHeroImageIndex].cover) {
        heroImage.classList.remove("contain");
    } else {
        heroImage.classList.add("contain");
    }
}
function showHeroImage() {
    heroImage.style.opacity = 1;
}
function hideHeroImage() {
    heroImage.style.opacity = 0;
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
