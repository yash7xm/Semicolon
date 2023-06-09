const slides = document.getElementsByTagName("article");
const rightBtn = document.querySelectorAll('.move-btns .right-btn');
const leftBtn = document.querySelectorAll('.move-btns .left-btn');
const nav = document.querySelector('nav');
const testLink = document.querySelector('.test-link a');
const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const borderLinks = document.querySelectorAll('.border-link');
const heading = document.querySelectorAll('.heading p');
const notes = document.querySelectorAll('.text-section p');

let activeIndex = 0;
let topic, unit, sub, data;

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

heading.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
    })
})

notes.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
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

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        !clickedElement.classList.contains('left-btn') &&
        !clickedElement.classList.contains('right-btn')) {

        if (!mouseCaret.classList.contains('clicked'))
            applyNextColorTheme();
    }

    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        !clickedElement.classList.contains('left-btn') &&
        !clickedElement.classList.contains('right-btn')) {

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


fetchData();
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/sendNotes');
        const obj = (await response.json());
        topic = obj.topicIndex;
        unit = obj.unitIndex;
        sub = obj.subjectIndex;
        data = obj.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
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

    let nextTopicHeading = document.querySelector(`[data-index="${nextIndex}"] p`);
    let nextTopicContent = document.querySelector(`[data-index="${nextIndex}"] .text p`);

    if (topic < data[0].sem[0].subjects[sub].units[unit].topics.length - 1) {
        topic++;
    }
    else {
        topic = 0;
    }

    nextTopicHeading.textContent = data[0].sem[0].subjects[sub].units[unit].topics[topic].name;
    nextTopicContent.textContent = data[0].sem[0].subjects[sub].units[unit].topics[topic].content;

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

    let nextTopicHeading = document.querySelector(`[data-index="${nextIndex}"] p`);
    let nextTopicContent = document.querySelector(`[data-index="${nextIndex}"] .text p`);

    if (topic > 0) {
        topic--;
    }
    else {
        topic = data[0].sem[0].subjects[sub].units[unit].topics.length - 1;
    }

    nextTopicHeading.textContent = data[0].sem[0].subjects[sub].units[unit].topics[topic].name;
    nextTopicContent.textContent = data[0].sem[0].subjects[sub].units[unit].topics[topic].content;
}

function handleNavToggle() {
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}


testLink.addEventListener('click', async () => {
    await fetch('http://localhost:8080/topicType', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: data[0].sem[0].subjects[sub].units[unit].topics[topic].content
        })
    })
    window.location.href = 'http://localhost:8080/topicTest';
})
