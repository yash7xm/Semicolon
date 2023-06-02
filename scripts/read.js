const nav = document.querySelector('nav');

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
  
  document.addEventListener("click", function(event) {
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


function handleNavToggle(){
  nav.dataset.transitionable = 'true';
  nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true" ;
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
const subject = document.querySelectorAll('.subject-select  div');
const unit = document.querySelectorAll('.unit-select li');
const sem = document.querySelectorAll('.sem-select li');
const topics = document.querySelector('.topics');


const spanSem = document.querySelector(".sem-no");
const spanUnit = document.querySelector('.unit-no');

let unitNo=0; subNo=0, semesterNo=0;

subjectMobile.forEach(sub => {
  sub.addEventListener('click', event => {
    subNo = event.target.getAttribute('value');
    console.log(subNo);
    showTopics();
  })
});

subject.forEach(sub => {
  sub.addEventListener('click', event => {
    subNo = event.target.getAttribute('value');
    console.log(subNo);
    showTopics();
  })
});

unit.forEach(units => {
  units.addEventListener('click', event => {
    unitNo = event.target.getAttribute('value');
    spanUnit.textContent = `${parseInt(unitNo) + 1}`;
    showTopics();
  })
});

sem.forEach(ssem => {
  ssem.addEventListener('click', event => {
    semesterNo = event.target.getAttribute('value');
    spanSem.textContent = `${parseInt(semesterNo) + 1}`;
    showTopics();
  })
})

function showTopics(){
  let topicIndex = 0;
  topics.innerHTML = '';
  for(let topic of data[0].sem[semesterNo].subjects[subNo].units[unitNo].topics) {
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
  console.log(event.target.parentNode)
  if(event.target.parentNode.classList.contains('card')) {
    // console.log("mf")
    let topicNo = event.target.parentNode.getAttribute('value');
    console.log(topicNo)
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