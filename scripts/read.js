const nav = document.querySelector('nav');
const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const borderLinks = document.querySelectorAll('.border-link');
const sub = document.querySelector('.sub');
const Sem = document.querySelector('.sem');
const semDropdownToggle = document.querySelector('.sem-dropdown-toggle');
const Unit = document.querySelector('.unit');
const unitDropdownToggle = document.querySelector('.unit-dropdown-toggle');
const subjectName = document.querySelectorAll('.subject-select div p');

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
    mouseCaret.classList.remove('mouseCaret');
  })
  link.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
  })
})

sub.addEventListener('mouseover', () => {
  mouseCaret.classList.add('caret-grow');
  sub.classList.add('hovered-link');
})
sub.addEventListener('mouseleave', () => {
  mouseCaret.classList.remove('caret-grow');
  sub.classList.remove('hovered-link');
})

Sem.addEventListener('mouseover', () => {
  mouseCaret.classList.add('caret-grow');
  Sem.classList.add('hovered-link');
})
Sem.addEventListener('mouseleave', () => {
  mouseCaret.classList.remove('caret-grow');
  Sem.classList.remove('hovered-link');
})

semDropdownToggle.addEventListener('mouseover', () => {
  mouseCaret.classList.remove('mouseCaret');
})
semDropdownToggle.addEventListener('mouseleave', () => {
  mouseCaret.classList.add('mouseCaret');
})

Unit.addEventListener('mouseover', () => {
  mouseCaret.classList.add('caret-grow');
  Unit.classList.add('hovered-link');
})
Unit.addEventListener('mouseleave', () => {
  mouseCaret.classList.remove('caret-grow');
  Unit.classList.remove('hovered-link');
})

unitDropdownToggle.addEventListener('mouseover', () => {
  mouseCaret.classList.remove('mouseCaret');
})
unitDropdownToggle.addEventListener('mouseleave', () => {
  mouseCaret.classList.add('mouseCaret');
})

subjectName.forEach(subName => {
  subName.addEventListener('mouseover', (event) => {
    mouseCaret.classList.remove('mouseCaret');
  })
  subName.addEventListener('mouseleave', (event) => {
    mouseCaret.classList.add('mouseCaret');
  })
})

function semToggleDropdown() {
  var dropdownMenu = document.getElementById("semDropdownMenu");
  dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
}

function unitToggleDropdown() {
  var dropdownMenu = document.getElementById("unitDropdownMenu");
  dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
}

function subToggleDropdown() {
  var dropdownMenu = document.getElementById("subDropdownMenu");
  dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
}

document.addEventListener("click", function (event) {
  var semDropdownMenu = document.getElementById("semDropdownMenu");
  var unitDropdownMenu = document.getElementById("unitDropdownMenu");
  var subDropdownMenu = document.getElementById("subDropdownMenu");
  var semDropdownToggle = document.querySelector(".sem-dropdown-toggle");
  var unitDropdownToggle = document.querySelector(".unit-dropdown-toggle");
  var subDropdownToggle = document.querySelector(".sub-dropdown-toggle");

  if (!semDropdownToggle.contains(event.target)) {
    semDropdownMenu.style.display = "none";
  }
  if (!unitDropdownToggle.contains(event.target)) {
    unitDropdownMenu.style.display = "none";
  }
  if (!subDropdownToggle.contains(event.target)) {
    subDropdownMenu.style.display = "none";
  }
});

document.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (clickedElement.tagName.toLowerCase() !== 'button' &&
    clickedElement.tagName.toLowerCase() !== 'a' &&
    clickedElement.tagName.toLowerCase() !== 'li' &&
    clickedElement.tagName.toLowerCase() !== 'p' &&
    clickedElement.tagName.toLowerCase() !== 'i' &&
    clickedElement.tagName.toLowerCase() !== 'span' &&
    !clickedElement.classList.contains('sub') &&
    !clickedElement.classList.contains('sem') &&
    !clickedElement.classList.contains('unit') &&
    !clickedElement.classList.contains('card') &&
    !clickedElement.closest('.card')) {

    if (!mouseCaret.classList.contains('clicked'))
      applyNextColorTheme();
  }

  if (clickedElement.tagName.toLowerCase() !== 'button' &&
    clickedElement.tagName.toLowerCase() !== 'a' &&
    clickedElement.tagName.toLowerCase() !== 'li' &&
    clickedElement.tagName.toLowerCase() !== 'p' &&
    clickedElement.tagName.toLowerCase() !== 'i' &&
    clickedElement.tagName.toLowerCase() !== 'span' &&
    !clickedElement.classList.contains('sub') &&
    !clickedElement.classList.contains('sem') &&
    !clickedElement.classList.contains('unit') &&
    !clickedElement.classList.contains('card') &&
    !clickedElement.closest('.card')) {

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

function handleNavToggle() {
  nav.dataset.transitionable = 'true';
  nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
  nav.dataset.transitionable = "false";
  nav.dataset.toggled = "false";
}


let data;
fetchData();
async function fetchData() {
  try {
    const response = await fetch('http://localhost:8080/dog');
    data = (await response.json());
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


const subjectMobile = document.querySelectorAll('.subject-select-mobile li');
const subject = document.querySelectorAll('.subject-select  div p');
const unit = document.querySelectorAll('.unit-select li');
const sem = document.querySelectorAll('.sem-select li');
const topics = document.querySelector('.topics');


const spanSem = document.querySelector(".sem-no");
const spanUnit = document.querySelector('.unit-no');

let unitNo = 0, subNo = 0, semesterNo = 3;

subjectMobile.forEach(sub => {
  sub.addEventListener('click', event => {
    subNo = event.target.getAttribute('value');
    subjectMobile.forEach(subColor => {
      subColor.style.color = "var(--main-text-color)";
    })
    sub.style.color = 'yellow';
    if (semesterNo == 3) {
      showTopics();
    }
    else {
      showMessage();
    }
  })
});

subject.forEach(sub => {
  sub.addEventListener('click', event => {
    subNo = event.target.getAttribute('value');
    subject.forEach(subColor => {
      subColor.style.color = "var(--main-text-color)";
    })
    sub.style.color = 'yellow';
    if (semesterNo == 3) {
      showTopics();
    }
    else {
      showMessage();
    }
  })
});

unit.forEach(units => {
  units.addEventListener('click', event => {
    unitNo = event.target.getAttribute('value');
    spanUnit.textContent = `${parseInt(unitNo) + 1}`;
    if (semesterNo == 3) {
      showTopics();
    }
    else {
      showMessage();
    }
  })
});

sem.forEach(ssem => {
  ssem.addEventListener('click', event => {
    semesterNo = event.target.getAttribute('value');
    spanSem.textContent = `${parseInt(semesterNo) + 1}`;
    if (semesterNo == 3) {
      showTopics();
    }
    else {
      showMessage();
    }
  })
})

function showMessage() {
  topics.innerHTML = '';
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper');

  const message = document.createElement('div');
  message.classList.add('message');

  message.textContent = 'SOON TO BE UPDATED';

  messageWrapper.appendChild(message);
  topics.appendChild(messageWrapper)

  subject.forEach(sub => {
    sub.textContent = '';
  })
}

function showTopics() {
  let topicIndex = 0;
  topics.innerHTML = '';
  let i = 0;
  subject.forEach(sub => {
    sub.textContent = data[0].sem[0].subjects[i].subjectName;
    i++;
  })
  for (let topic of data[0].sem[0].subjects[subNo].units[unitNo].topics) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('value', topicIndex++);

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    card.appendChild(cardImage);

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    const cardTextH = document.createElement('h6');
    cardTextH.textContent = `${topic.name}`;
    cardText.appendChild(cardTextH);

    card.appendChild(cardText);
    topics.appendChild(card);
  }

};

topics.addEventListener('click', async (event) => {
  if (event.target.parentNode.classList.contains('card')) {
    let topicNo = event.target.parentNode.getAttribute('value');
    await fetch('http://localhost:8080/showPost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topicIndex: topicNo,
        subjectIndex: subNo,
        unitIndex: unitNo,
      })
    })
    window.location.href = 'http://localhost:8080/show';
  }
})