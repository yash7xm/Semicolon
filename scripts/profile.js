const textArea = document.querySelector('.text-area');
const textMsg = document.querySelector('.text-area p');
const edit = document.querySelector('.edit');
const submit = document.querySelector('.submit');
const thanksMsg = document.querySelector('.thanks-msg');
const nameEditBtn = document.querySelector('.name-edit-btn');
const userName = document.querySelector('.name span');
const popup = document.querySelector('.popup');
const popupWraper = document.querySelector('.popup-wraper')
const photoEditBtn = document.querySelector('.photo i');
const userPhotos = document.querySelectorAll('.photo-select img');
const userMainPhoto = document.querySelector('.photo img');
const nav = document.querySelector('nav');
const mouseCaret = document.querySelector('.mouseCaret');
const navLinks = document.querySelectorAll('nav .grow-link');
const borderLinks = document.querySelectorAll('.border-link');
const rank = document.querySelector('.rank');
const bestScore = document.querySelector('.best-score');
const completedTests = document.querySelector('.completed-tests');
const joinedDate = document.querySelector('.joined-date');
const UserName = document.querySelector('.username');
const Name = document.querySelector('.name');
const reviewHeading = document.querySelector('.heading strong');
const graph = document.querySelector('.graph');
const map = document.querySelector('.map');

let initUserName = '';
let initMsg = '';
let value = 1;

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
        // link.classList.add('hovered-link');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
        // link.classList.remove('hovered-link');
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

rank.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
rank.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

bestScore.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
bestScore.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

completedTests.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
completedTests.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

joinedDate.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
joinedDate.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

UserName.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
UserName.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

Name.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
Name.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

photoEditBtn.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
    photoEditBtn.style.color = 'var(--hover-color)'
})
photoEditBtn.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
    photoEditBtn.style.color = 'var(--main-text-color)'
})

nameEditBtn.addEventListener('mouseover', () => {
    nameEditBtn.style.color = 'var(--hover-color)'
})
nameEditBtn.addEventListener('mouseleave', () => {
    nameEditBtn.style.color = 'var(--main-text-color)'
})

reviewHeading.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
reviewHeading.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

textArea.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
textArea.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

edit.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
    edit.style.color = 'var(--hover-color)'
})
edit.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
    edit.style.color = 'var(--main-text-color)'
})

submit.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
    submit.style.color = 'var(--hover-color)'
})
submit.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
    submit.style.color = 'var(--main-text-color)'
})

graph.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
graph.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

map.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})
map.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        clickedElement.tagName.toLowerCase() !== 'img' &&
        !clickedElement.closest('.graph') &&
        !clickedElement.closest('.map') &&
        !clickedElement.closest('.text-area') &&
        !clickedElement.closest('p') &&
        !clickedElement.closest('.rank') &&
        !clickedElement.closest('.best-score') &&
        !clickedElement.closest('.completed-tests') &&
        !clickedElement.closest('.joined-date') &&
        !clickedElement.closest('.username') &&
        !clickedElement.closest('.name') &&
        !clickedElement.closest('.popup') &&
        clickedElement !== edit &&
        clickedElement !== submit) {

        if (!mouseCaret.classList.contains('clicked'))
            applyNextColorTheme();
    }

    if (clickedElement.tagName.toLowerCase() !== 'button' &&
        clickedElement.tagName.toLowerCase() !== 'a' &&
        clickedElement.tagName.toLowerCase() !== 'p' &&
        clickedElement.tagName.toLowerCase() !== 'i' &&
        clickedElement.tagName.toLowerCase() !== 'span' &&
        clickedElement.tagName.toLowerCase() !== 'img' &&
        !clickedElement.closest('.graph') &&
        !clickedElement.closest('.map') &&
        !clickedElement.closest('.text-area') &&
        !clickedElement.closest('p') &&
        !clickedElement.closest('.rank') &&
        !clickedElement.closest('.best-score') &&
        !clickedElement.closest('.completed-tests') &&
        !clickedElement.closest('.joined-date') &&
        !clickedElement.closest('.username') &&
        !clickedElement.closest('.name') &&
        !clickedElement.closest('.popup') &&
        clickedElement !== edit &&
        clickedElement !== submit) {

        mouseCaret.classList.add('clicked');
        setTimeout(function () {
            mouseCaret.classList.remove('clicked');
        }, 800);
    }
});


photoEditBtn.addEventListener('click', () => {
    popup.style.display = 'initial';
})

popupWraper.addEventListener('click', (event) => {
    if (!event.target.classList.contains('photo-select'))
        popup.style.display = 'none';
})

userPhotos.forEach((photo) => {
    photo.addEventListener('click', (event) => {
        value = event.target.dataset.value;
        updatePhoto();
        const selectedImageSrc = event.target.getAttribute('src');
        userMainPhoto.setAttribute('src', selectedImageSrc);
    });
});

nameEditBtn.addEventListener('click', () => {
    userName.textContent = userName.textContent.replace(/\s+/g, " ").trim();

    if (nameEditBtn.classList.contains('fa-pen-to-square')) {
        userName.setAttribute('contenteditable', 'true');
        userName.focus();
        nameEditBtn.classList.remove('fa-pen-to-square');
        nameEditBtn.classList.add('fa-check');
        initUserName = userName.textContent;
    }
    else if (nameEditBtn.classList.contains('fa-check')) {
        userName.removeAttribute('contenteditable', 'true');
        nameEditBtn.classList.add('fa-pen-to-square');
        nameEditBtn.classList.remove('fa-check');
        userName.blur();
        if (userName.textContent === '') {
            userName.textContent = 'Cannot be blank';
            nameEditBtn.style.display = 'none';
            setTimeout(() => {
                userName.textContent = initUserName;
                nameEditBtn.style.display = 'initial';
            }, 2000);
            return;
        }
        else if (userName.textContent.length > 20) {
            userName.textContent = 'Limit exceeded > 20';
            nameEditBtn.style.display = 'none';
            setTimeout(() => {
                userName.textContent = initUserName;
                nameEditBtn.style.display = 'initial';
            }, 2000);
            return;
        }

        updateName();

        const tempName = userName.textContent;
        userName.textContent = 'Name Changed!';
        nameEditBtn.style.display = 'none';
        setTimeout(() => {
            userName.textContent = tempName;
            nameEditBtn.style.display = 'initial';
        }, 2000);
    }
})

userName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        nameEditBtn.click();
    }
});

userName.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    if (text.length > 20) {
        userName.textContent = 'Limit exceeded > 20';
        nameEditBtn.style.display = 'none';
        userName.blur();
        setTimeout(() => {
            userName.textContent = initUserName;
            nameEditBtn.style.display = 'initial';
            userName.focus();
        }, 2000);
        return;
    }
    userName.textContent = text;
});

userName.addEventListener('focus', () => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(userName);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
});

userName.addEventListener('input', () => {
    const maxLength = 20;
    let currentText = userName.textContent;
    if (userName.textContent.length > maxLength) {
        currentText = currentText.slice(0, maxLength);
        userName.textContent = 'Limit exceeded > 20';
        nameEditBtn.style.display = 'none';
        userName.blur();
        setTimeout(() => {
            userName.textContent = currentText;
            nameEditBtn.style.display = 'initial';
            userName.focus();
        }, 2000);
    }
})

edit.addEventListener('click', () => {
    if (!thanksMsg.classList.contains('hidden')) {
        thanksMsg.classList.add('hidden');
        textArea.style.display = 'initial';
        textMsg.style.display = 'initial';
        thanksMsg.querySelector('p').textContent = 'Thank You for your Feedback!';
    }
    textMsg.textContent = textMsg.textContent.replace(/\s+/g, " ").trim();
    edit.style.color = 'yellow';
    initMsg = textMsg.textContent;
    textMsg.setAttribute('contenteditable', 'true');
    textMsg.focus();
    if (textMsg.textContent === 'Max 100 chars long')
        textMsg.textContent = '';
})

submit.addEventListener('click', () => {
    textMsg.textContent = textMsg.textContent.replace(/\s+/g, " ").trim();
    textMsg.blur();
    textMsg.removeAttribute('contenteditable', 'true');
    if (!thanksMsg.classList.contains('hidden')) {
        thanksMsg.classList.add('hidden');
        thanksMsg.querySelector('p').textContent = 'Thank You for your Feedback!';
        textArea.style.display = 'initial';
        textMsg.style.display = 'initial';
        return;
    }
    if (textMsg.textContent.length > 100) {
        thanksMsg.classList.remove('hidden');
        thanksMsg.querySelector('p').textContent = 'Oops! More than 100 chars';
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
        setTimeout(() => {
            textMsg.textContent = initMsg;
            thanksMsg.classList.add('hidden');
            textMsg.style.display = 'initial';
            textArea.style.display = 'initial';
            textMsg.focus();
        }, 2000);
        return;
    }
    if (textMsg.textContent === '' || textMsg.textContent === 'Max 100 chars long') {
        textMsg.textContent = 'Max 100 chars long';
    } else {
        updateMsg();
        thanksMsg.classList.remove('hidden');
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
    }
});

textMsg.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    if (text.length > 100) {
        thanksMsg.classList.remove('hidden');
        thanksMsg.querySelector('p').textContent = 'Oops! More than 100 chars';
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
        textMsg.blur();
        setTimeout(() => {
            textMsg.textContent = initMsg;
            thanksMsg.classList.add('hidden');
            textMsg.style.display = 'initial';
            textArea.style.display = 'initial';
            textMsg.focus();
        }, 2000);
        return;
    }
    textMsg.textContent = text;
});

textMsg.addEventListener('focus', () => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(textMsg);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
});

textMsg.addEventListener('input', () => {
    const maxLength = 100;
    let currentText = textMsg.textContent;
    if (textMsg.textContent.length > maxLength) {
        currentText = currentText.slice(0, maxLength);
        thanksMsg.classList.remove('hidden');
        thanksMsg.querySelector('p').textContent = 'Oops! More than 100 chars';
        textMsg.style.display = 'none';
        textArea.style.display = 'flex';
        textArea.style.justifyContent = 'center';
        textArea.style.alignItems = 'center';
        textMsg.blur();
        setTimeout(() => {
            textMsg.textContent = currentText;
            thanksMsg.classList.add('hidden');
            textMsg.style.display = 'initial';
            textArea.style.display = 'initial';
            textMsg.focus();
        }, 2000);
    }
})

document.addEventListener('click', (e) => {
    if (e.target !== edit && e.target !== textArea && e.target !== textMsg) {
        textMsg.blur();
        textMsg.removeAttribute('contenteditable', 'true');
        if (textMsg.textContent === '')
            textMsg.textContent = 'Max 100 chars long';
        edit.style.color = 'var(--main-text-color)';
    }

    if (e.target !== nameEditBtn && e.target !== userName) {
        userName.blur();
        userName.removeAttribute('contenteditable', 'true');
        nameEditBtn.style.color = 'var(--main-text-color)';
        nameEditBtn.classList.add('fa-pen-to-square');
        nameEditBtn.classList.remove('fa-check');
    }
})

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

let userData;

// fetchUserData();
async function fetchUserData() {
    await fetch('http://localhost:8080/graphData')
        .then(response => response.json())
        .then(data => {
            userData = data;
            google.charts.setOnLoadCallback(drawBasic);
            google.charts.setOnLoadCallback(drawChart);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


let chart, data, options;
var chartContainer = document.getElementById('chart_div').parentElement;
let containerWidth, containerHeight;
containerWidth = chartContainer.offsetWidth;
containerHeight = chartContainer.offsetHeight;
google.charts.load('current', { packages: ['corechart', 'line'] });

function drawBasic() {
    data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Score');

    let dataArray = [];
    for (let i = 0; i < userData.score.length; i++) {
        dataArray.push([i + 1, parseFloat(userData.score[i].wpm)]);
    }

    data.addRows(dataArray);

    options = {
        hAxis: {
            title: '',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
        },
        vAxis: {
            title: 'Score',
            gridlines: { color: 'transparent' },
            baselineColor: 'transparent',
            titleTextStyle: {
                fontSize: 20,
                color: 'rgb(126, 87, 194)',
            },
        },
        backgroundColor: 'transparent',
        chartArea: {
            backgroundColor: 'transparent',
        },
        colors: ['yellow'],
        width: containerWidth,
        height: containerHeight,
        legend: 'none',
        series: {
            0: {
                pointShape: 'circle',
                pointSize: 5,
                color: 'yellow',
            },
        },
    };

    chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

document.addEventListener('DOMContentLoaded', function () {
    fetchUserData();
});

let initialHeight = window.innerHeight;

window.addEventListener('resize', () => {
    if (window.innerHeight != initialHeight)
        window.location.reload();
    else
        initialHeight = window.innerHeight;
    handleChartResize();
    fetchUserData();
})

function handleChartResize() {
    containerWidth = chartContainer.offsetWidth;
    containerHeight = chartContainer.offsetHeight;
    // google.charts.setOnLoadCallback(drawBasic);
}


google.charts.load("current", { packages: ["calendar"] });

function drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });

    const hashtable = {};
    function addToHashtable(date, data) {
        if (hashtable[date]) {
            hashtable[date] += data;
        } else {
            hashtable[date] = data;
        }
    }

    for (let i = 0; i < userData.score.length; i++) {
        const date = userData.score[i].date;
        addToHashtable(date, 1);
    }

    const hashArray = Object.entries(hashtable);

    let dataArray = [];
    for (let i = 0; i < hashArray.length; i++) {
        let date = hashArray[i][0];
        let freq = hashArray[i][1];
        let dateArray = date.split(" ");
        dataArray.push([new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])), freq]);
    }


    dataTable.addRows(dataArray);

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));

    var options = {
        title: "",
        legend: 'none',
        width: '1100',
        height: '450',
        noDataPattern: {
            backgroundColor: 'transparent',
            color: '#050a18',
        },
        colorAxis: { minValue: 0, colors: ['#FFFFE0', '#FFD700'] },

        calendar: {
            underMonthSpace: 15,
            dayOfWeekRightSpace: 15,
            unusedMonthOutlineColor: {
                stroke: '#ccc',
                strokeOpacity: 0.5,
                strokeWidth: 0.5
            },
            cellColor: {
                stroke: '#1e2345',
                strokeOpacity: 0.5,
                strokeWidth: 1,
                color: 'black',
            },
            focusedCellColor: {
                stroke: 'yellow',
                strokeOpacity: 0.8,
                strokeWidth: 1,

            },

            monthOutlineColor: {
                stroke: 'yellow',
                strokeOpacity: 0.5,
                strokeWidth: 1
            },
            cellSize: 18,
            yearLabel: {
                fontName: 'Times-Roman',
                fontSize: 32,
                color: 'transparent',
                bold: true,
                italic: true
            },
        }
    };
    chart.draw(dataTable, options);
}

async function updateMsg() {
    try {
        const response = await fetch('http://localhost:8080/updateMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Msg: textMsg.textContent.replace(/\s+/g, " ").trim()
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update msg');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateName() {
    try {
        const response = await fetch('http://localhost:8080/updateName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: userName.textContent
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update name');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updatePhoto() {
    try {
        const response = await fetch('http://localhost:8080/updatePhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PhotoNumber: value
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to update photo');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function handleNavToggle() {
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}