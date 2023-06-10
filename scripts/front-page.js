const slides = document.getElementsByTagName("article");
const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const rightBtn = document.querySelectorAll('.move-btns .right-btn');
const leftBtn = document.querySelectorAll('.move-btns .left-btn');
const borderLinks = document.querySelectorAll('.border-link');
const nav = document.querySelector('nav');
const loading = document.querySelector('.loading-wrapper');
const gitLinks = document.querySelectorAll('.personel-info > a');

let scrollDownStop = false;
let scrollTopStop = false;
let activeIndex = 0;
let users;

document.addEventListener('DOMContentLoaded', function () {
    var defaultTheme = 'theme1';
    document.documentElement.classList.add(defaultTheme);
});

window.addEventListener('load', function () {
    document.body.classList.add('no-transition');

    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 1000);
});

window.addEventListener('mousemove', (e) => {
    mouseCaret.style.top = e.pageY + 'px';
    mouseCaret.style.left = e.pageX + 'px';
})

borderLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = 'var(--hover-color)';
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
        link.style.color = 'var(--main-text-color)';
        mouseCaret.classList.add('mouseCaret');
    })
})

rightBtn.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
    })
    btn.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
    })
})

leftBtn.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
    })
    btn.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
    })
})

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
        link.classList.add('hovered-link');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
        link.classList.remove('hovered-link');
    })
})

gitLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.add('mouseCaret');
    })
})

function handleMouseEnter() {
    const headingText = document.querySelector(`[data-index="${activeIndex}"] .heading .heading-text`);
    const rotatingIcon = document.querySelector(`[data-index="${activeIndex}"] .heading .rotating-icon img`);
    const headingFrontText = document.querySelector(`[data-index="${activeIndex}"] .heading-front-text`);
    const headingSecondaryText = document.querySelector(`[data-index="${activeIndex}"] .heading-secondary-text`);
    headingFrontText.style.opacity = '0';
    headingSecondaryText.style.opacity = '1';
    headingFrontText.style.transform = 'translateY(-100%)';
    headingSecondaryText.style.transform = 'translateY(-100%)';
    mouseCaret.classList.add('caret-grow-heading');
    rotatingIcon.style.transform = "rotate(90deg)";
    rotatingIcon.style.transition = "transform 0.3s ease-out";
}

function handleMouseExit() {
    const headingText = document.querySelector(`[data-index="${activeIndex}"] .heading-text`);
    const headingFrontText = document.querySelector(`[data-index="${activeIndex}"] .heading-front-text`);
    const headingSecondaryText = document.querySelector(`[data-index="${activeIndex}"] .heading-secondary-text`);
    const rotatingIcon = document.querySelector(`[data-index="${activeIndex}"] .heading .rotating-icon img`);
    headingFrontText.style.opacity = '1';
    headingSecondaryText.style.opacity = '0';
    headingFrontText.style.transform = 'translateY(0%)';
    headingSecondaryText.style.transform = 'translateY(100%)';
    mouseCaret.classList.remove('caret-grow-heading');
    rotatingIcon.style.transform = "rotate(0deg)";
    rotatingIcon.style.transition = "transform 0.3s ease-out";
}

function handleRightBtn() {
    const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

    currentSlide.dataset.status = "before";

    nextSlide.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    });

}

function handleLeftBtn() {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

    currentSlide.dataset.status = "after";

    nextSlide.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    });
}

function handleNavToggle() {
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'li' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'input' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        clickedElement.tagName.toLowerCase() !== 'h1' &&
        !clickedElement.classList.contains('image') &&
        clickedElement.tagName.toLowerCase() !== 'img' &&
        !clickedElement.classList.contains('left-btn') &&
        !clickedElement.classList.contains('right-btn') &&
        !clickedElement.closest('.image')) {

        if (!mouseCaret.classList.contains('clicked'))
            applyNextColorTheme();
    }

    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'li' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'input' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        clickedElement.tagName.toLowerCase() !== 'h1' &&
        !clickedElement.classList.contains('image') &&
        clickedElement.tagName.toLowerCase() !== 'img' &&
        !clickedElement.classList.contains('left-btn') &&
        !clickedElement.classList.contains('right-btn') &&
        !clickedElement.closest('.image')) {

        mouseCaret.classList.add('clicked');
        setTimeout(function () {
            mouseCaret.classList.remove('clicked');
        }, 800);
    }
});

function applyNextColorTheme() {
    var themes = ['theme1', 'theme2', 'theme3'];
    var currentTheme = getAppliedTheme();
    document.documentElement.classList.remove(currentTheme);
    var currentIndex = themes.indexOf(currentTheme);
    var nextIndex = (currentIndex + 1) % themes.length;
    var nextTheme = themes[nextIndex];
    document.documentElement.classList.add(nextTheme);
}

function getAppliedTheme() {
    var themes = ['theme1', 'theme2', 'theme3'];
    var appliedTheme = themes.find(theme => document.documentElement.classList.contains(theme));
    return appliedTheme;
}

fetchEverything();
async function fetchEverything() {
    await fetch('https://semicolon-io9d.onrender.com/everything', {
        method: "POST",

    })
    loading.style.display = 'none';
}

fetchUsers();
async function fetchUsers() {
    fetch('https://semicolon-io9d.onrender.com/leadborad')
        .then(response => response.json())
        .then(data => {
            users = data;
            showLeaderBoard();
        })
        .catch(error => {
            // console.error('Error:', error);
        });
}

function showLeaderBoard() {
    const list = document.querySelector('.top-list');

    for (let i = 0; i < users.length && i < 100; i++) {

        const restList = document.createElement('div');
        restList.classList.add('rest-list');

        const rankNo = document.createElement('div');
        rankNo.classList.add('rank-no');
        rankNo.textContent = `${i + 1}`;

        const rankName = document.createElement('div');
        rankName.classList.add('rank-name');
        rankName.textContent = `${users[i].username}`;

        const rankSpeed = document.createElement('div');
        rankSpeed.classList.add('rank-speed');
        rankSpeed.textContent = `${users[i].bestScore}`;

        restList.appendChild(rankNo);
        restList.appendChild(rankName);
        restList.appendChild(rankSpeed);

        list.appendChild(restList);
    }
}