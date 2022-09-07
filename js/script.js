'use strict';

// Mobile Navigation

const burgerBtn = document.querySelector('.mobile-burger');
const nav = document.querySelector('.nav');
const navOverlay = document.querySelector('.nav__overlay');
const navElements = [burgerBtn, nav, navOverlay];

const mobileMenuShowHide = (items, classToToggle) => {
    items.forEach((item) => {
        item.classList.toggle(classToToggle);
    })
}

navElements.forEach((element) => {
    element.addEventListener('click', (event) => {
        const clicked = event.currentTarget;
        if (clicked.classList.contains('active') || clicked === burgerBtn) {
            mobileMenuShowHide(navElements, 'active')
        }
    })
})

// Login pop-up

// Login pop-up  // Selecors

const header = document.querySelector('.header');
const loginContainer = document.querySelector('.login');
const loginOverlay = document.querySelector('.login_overlay');
const loginPopup = document.querySelector('.login__popup');
const loginForm = document.getElementById('login-form');

// Login pop-up  // Change login pop-up from Sign In to Sign Up

const loginTitle = document.querySelector('.login__title');
const loginButton = document.querySelector('.login-button');
const loginText = document.querySelector('.login-text');
const changeLink = document.querySelector('.login-form-change-link');

const changeChildNodesClass = (parentNode, selector, cssClass, add = true) => {
    parentNode
        .querySelectorAll(selector)
        .forEach((childNode) => {
            add ? childNode.classList.add(cssClass) : childNode.classList.remove(cssClass);
        })
}

const changeLoginFormInner = (currentState = 'default') => {
    const data = {
        singin: {
            switchTo: 'singup',
            hideNodes: false,
            title: 'Log in to your account',
            button: 'Sign In',
            text: 'Don\'t have an account?',
            link: 'Register'

        },
        singup: {
            switchTo: 'singin',
            hideNodes: true,
            title: 'Create account',
            button: 'Sign Up',
            text: 'Already have an account?',
            link: 'Log in'
        },
    }

    const switchToState = currentState === 'default' ? 'singin' : data[currentState].switchTo;
    const newStateData = data[switchToState];

    loginTitle.innerHTML = newStateData.title;
    loginButton.setAttribute('value', newStateData.button);
    loginText.innerHTML = newStateData.text;
    changeLink.innerHTML = newStateData.link;
    changeLink.setAttribute('data-current-state', switchToState);

    changeChildNodesClass(loginPopup, '[data-singup-hide]', 'hide', newStateData.hideNodes);
    changeChildNodesClass(loginForm, '.login-form__label', 'login-form__label_singup', newStateData.hideNodes);
    changeChildNodesClass(loginPopup, '.login__title', 'fix-template', newStateData.hideNodes);
    changeChildNodesClass(loginForm, '.button_login-popup', 'fix-template', newStateData.hideNodes);
    changeChildNodesClass(loginPopup, '.splitter_last', 'fix-template', newStateData.hideNodes);
}

changeLink.addEventListener('click', (event) => {
    const currentState = event.target.getAttribute('data-current-state');
    changeLoginFormInner(currentState);
})

// Login pop-up  // Open/Close login pop-up and reset to default values

header.addEventListener('click', (event) => {
    if (event.target.classList.contains('show-login')) {
        loginContainer.classList.toggle('active');
        loginOverlay.classList.toggle('active');
        changeLoginFormInner();
    }
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginEmail = event.currentTarget.email.value;
    const loginPassword = event.currentTarget.password.value;
    loginForm.reset();
    loginOverlay.classList.toggle('active');
    loginContainer.classList.toggle('active');
    alert(`E-mail: ${loginEmail}\nPassword: ${loginPassword}`);

})

loginOverlay.addEventListener('click', (event) => {
    loginOverlay.classList.toggle('active');
    loginContainer.classList.toggle('active');
    loginForm.reset();
})

// Slider

// Slider  // Settings

const _padding = 60;

// Slider  // Selecors

const sliderInner = document.querySelector('.slider__inner');
const slides = sliderInner.querySelector('.slides');
const sliderItems = slides.querySelectorAll('.slider__item');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const sliderDots = sliderInner.querySelector('.slider__dots');

// Slider  // Set defaults

sliderItems.forEach((sliderItem, i) => {
    sliderItem.setAttribute('data-slide', i + 1)
})

let currentActiveSlide = +slides.querySelector('.active').getAttribute('data-slide') - 1;

// Slider  // Calculations and Functions

const getWidth = (padding, block) => +window.getComputedStyle(block)
    .width.replace('px', '') + padding;

const getBaseX = () => -(getWidth(0, sliderInner) - getWidth(0, sliderItems[0])) / 2;

const showSliderDots = () => {
    let inner = '';
    for (let i = 1; i <= sliderItems.length; i++) {
        const active = i === currentActiveSlide + 1 ? ' dot_active' : '';
        inner += `<div class="dot${active}" data-slider-dot="${i}"></div>`;
    }
    sliderDots.innerHTML = inner;
}

const changeSliderDot = (to) => {
    sliderDots.querySelectorAll(`[data-slider-dot]`)
        .forEach((dot) => {
            dot.classList.remove('dot_active');
        })
    sliderDots.querySelector(`[data-slider-dot="${to + 1}"]`)
        .classList.add('dot_active');
}

const setPosOnLoadAndResize = () => {
    const offset = getBaseX() + currentActiveSlide * getWidth(_padding, sliderItems[0]);
    slides.classList.add('disable-transition');
    slides.style.transform = `translateX(${-offset}px)`;
}

const turnCustomSlide = (n) => {
    const offset = getBaseX() + n * getWidth(_padding, sliderItems[0]);
    slides.classList.remove('disable-transition');
    slides.style.transform = `translateX(${-offset}px)`;
    changeSliderDot(n);
}

const turnLeft = () => {
    if (currentActiveSlide > 0) {
        const offset = getBaseX() + (currentActiveSlide-- - 1) * getWidth(_padding, sliderItems[0]);
        slides.classList.remove('disable-transition');
        slides.style.transform = `translateX(${-offset}px)`;
        changeSliderDot(currentActiveSlide);
    }
}

const turnRight = () => {
    if (currentActiveSlide < sliderItems.length - 1) {
        const offset = getBaseX() + (currentActiveSlide++ + 1) * getWidth(_padding, sliderItems[0]);
        slides.classList.remove('disable-transition');
        slides.style.transform = `translateX(${-offset}px)`;
        changeSliderDot(currentActiveSlide);
    }
}

const setActive = (elements, toggleClass, elementIndex) => {
    elements.forEach((element) => {
        element.classList.remove(toggleClass);
        +element.getAttribute('data-slide') - 1 === elementIndex ? element.classList.add(toggleClass) : null; 
    });
}

// Slider  // Create navigation with dots

showSliderDots();

// Slider  // Listeners

document.addEventListener("DOMContentLoaded", setPosOnLoadAndResize);
window.addEventListener('resize', setPosOnLoadAndResize)

sliderInner.addEventListener('click', (event) => {
    // Click on adjacent (left or right) image
    const target = event.target.parentNode.parentNode.getAttribute('data-slide');
    let clicked = target ? +target : null;

    if (clicked) {
        switch (currentActiveSlide - clicked + 1) {
            case 1:
                turnLeft();
                break;
            case -1:
                turnRight();
                break;
        }
    }

    // Click on arrows
    if (event.target === arrowLeft) turnLeft();
    if (event.target === arrowRight) turnRight();

    // Click on dots
    if (event.target.hasAttribute('data-slider-dot')) {
        const next = +event.target.getAttribute('data-slider-dot') - 1
        turnCustomSlide(next);
        currentActiveSlide = next;
    }

    // Show/Hide arrows
    if (currentActiveSlide === sliderItems.length - 1) {
        arrowRight.classList.add('arrow_disabled');
        arrowLeft.classList.remove('arrow_disabled');
    }  else if (currentActiveSlide === 0) {
        arrowRight.classList.remove('arrow_disabled');
        arrowLeft.classList.add('arrow_disabled');
    } else {
        arrowRight.classList.remove('arrow_disabled');
        arrowLeft.classList.remove('arrow_disabled');
    }

    setActive(sliderItems, 'active', currentActiveSlide);


})

// Additional functionality // Transform selected String to СamelСase 

const transformStringToCamelCase = (text) => {
    return text
        .split(' ')
        .map((word) => {
            return word.slice(0, 1)
                .toUpperCase() + word.slice(1);
        })
        .join(' ');
}

document.querySelectorAll('.js-camel-case')
    .forEach((item) => {
        item.innerHTML = transformStringToCamelCase(item.innerHTML);
    })
