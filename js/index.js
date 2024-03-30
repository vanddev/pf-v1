const navbarItems = []
const navbarBurger = {}
const mainContent = document.getElementsByTagName('main')[0]
const htmlDocument = document.getElementsByTagName('html')[0]

const clean_language_buttons = () => {
    document.querySelectorAll('.button-lg').forEach(element => console.log(element.classList.add('is-outlined')))
}

const active_language_button = (element) => {
    element.classList.remove('is-outlined')
}

const isMenuVisible = () => {
    return window.getComputedStyle(document.querySelector(".navbar-burger")).display != 'none'
}

const isNavBurgerActive = () => {
    return document.querySelector(".navbar-burger").classList.contains("is-active")
}

const animateNavMenu = () => {
    document.getElementById("navMenu").classList.toggle("animate__slideInRight") 
}

const toggleMenu = () => {
    animateNavMenu();
    navbarItems.forEach(element => {
        element.classList.toggle('is-active');
    });

    mainContent.classList.toggle('blured');

    htmlDocument.classList.toggle('hide-scrollbar')

    if (mainContent.classList.contains('blured')) {
        disableScroll();
    } else {
        enableScroll();
    }
}

const navigationKeys = {37: 1, 38: 1, 39: 1, 40: 1};

const preventDefault = (e) => {e.preventDefault()}

const preventDefaultScrollKeys = (e) => {
if (navigationKeys[e.keyCode]) {
    preventDefault(e);
    return false;
}
}
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
} catch(e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultScrollKeys, false);
}

document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger')
    navbarItems.push(navbarBurger)
    navbarItems.push(document.getElementById(navbarBurger.dataset.target))
    navbarBurger.addEventListener('click', () => {
        toggleMenu();
    });

    const navbarStartItems = document.querySelectorAll('.navbar-start .navbar-item')
    navbarStartItems.forEach(el => {
        el.addEventListener('click', () => {
            if (isMenuVisible()) {
                toggleMenu();
            }
        })
    })
})