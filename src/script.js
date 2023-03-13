const mobileNav = document.querySelector('#mobile-nav');
const mobileMenu = document.querySelector('#mobile-menu');
const menuClose = document.querySelector('#close-menu');
let isOpen = false;

mobileNav.addEventListener('click', (e) => {
    e.stopPropagation();
    //If icon is touched, open mobile menu
    mobileMenu.classList.add('active');
    // Close menu when user taps anywhere (mobile) or scrolls
    window.addEventListener('touchend', closeMenu, { once: true });
    window.addEventListener('scroll', closeMenu, { once: true });
});

// Enable menu close button
menuClose.addEventListener('click', closeMenu);

function closeMenu () {
    mobileMenu.classList.remove('active');
}