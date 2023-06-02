const slides = document.getElementsByTagName("article");
const rightBtn = document.querySelectorAll('.move-btns .right-btn');
const leftBtn = document.querySelectorAll('.move-btns .left-btn');
const nav = document.querySelector('nav');
const testLink = document.querySelector('.test-link a');

let activeIndex = 0;


let topic, unit, sub, data;
fetchData();
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/sendNotes');
        const obj = (await response.json());
        topic = obj.topicIndex;
        unit = obj.unitIndex;
        sub = obj.subjectIndex;
        data = obj.data;
        console.log(obj);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// rightBtn.forEach(btn => {
//     btn.addEventListener('mouseover', () => {
//         mouseCaret.classList.add('caret-grow');
//     })
//     btn.addEventListener('mouseleave', () => {
//         mouseCaret.classList.remove('caret-grow');
//     })
// })

// leftBtn.forEach(btn => {
//     btn.addEventListener('mouseover', () => {
//         mouseCaret.classList.add('caret-grow');
//     })
//     btn.addEventListener('mouseleave', () => {
//         mouseCaret.classList.remove('caret-grow');
//     })
// })


function handleRightBtn(){
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

    if(topic < data[0].sem[0].subjects[sub].units[unit].topics.length - 1){
        topic++;
    }
    else {
        topic = 0;
    }

    nextTopicHeading.textContent =  data[0].sem[0].subjects[sub].units[unit].topics[topic].name;
    nextTopicContent.textContent =  data[0].sem[0].subjects[sub].units[unit].topics[topic].content;  

}

function handleLeftBtn(){
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

    if(topic > 0){
        topic--;
    }
    else {
        topic = data[0].sem[0].subjects[sub].units[unit].topics.length - 1;
    }

    nextTopicHeading.textContent =  data[0].sem[0].subjects[sub].units[unit].topics[topic].name;
    nextTopicContent.textContent =  data[0].sem[0].subjects[sub].units[unit].topics[topic].content;
}

function handleNavToggle(){
    nav.dataset.transitionable = 'true';
    nav.dataset.toggled = nav.dataset.toggled === "true" ? "false" : "true" ;
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav.dataset.transitionable = "false";
    nav.dataset.toggled = "false";
}


testLink.addEventListener('click', async() => {
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

