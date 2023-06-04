const singInBtn = document.getElementById('singInBtn');
const singUpBtn =  document.getElementById('singUpBtn');
const info = document.querySelector('.info');
const container = document.querySelector('.container');
const heading = document.querySelector('.heading');
const signInInfo = document.querySelector('.signIn-info')
const regInfo = document.querySelector('.reg-info');
const singIn = document.querySelector('.signIn');
const reg = document.querySelector('.reg');
const mobileSignIn = document.querySelector('.mobile-signIn-btn button');
let clickCounter = 0;

singInBtn.addEventListener('click', () => {
    info.style.transform = 'translateX(150%)';
    info.style.border = 'none';
    singIn.style.left = '0%';
    reg.style.left = '0%';
    regInfo.style.left = '-40%';
    regInfo.style.opacity = '0';
    signInInfo.style.left = '60%';
    signInInfo.style.opacity = '1';
    setTimeout(() => {
        regInfo.style.display = 'none';
        info.style.borderLeft = '1px solid #1e2345';
    }, 300);
    setTimeout(() => {
        signInInfo.style.display = 'flex';
    }, 150);
    setTimeout(() => {
        singIn.style.display = 'none';
        reg.style.display = 'flex';
        reg.style.zIndex = '1000';
    }, 250);
})

singUpBtn.addEventListener('click', () => {
    info.style.transform = 'translateX(0%)';
    info.style.border = 'none';
    singIn.style.left = '40%';
    reg.style.left = '40%';
    regInfo.style.left = '0%';
    regInfo.style.opacity = '1';
    signInInfo.style.left = '100%';
    signInInfo.style.opacity = '0';
    setTimeout(() => {
        regInfo.style.display = 'flex';
        info.style.borderRight = '1px solid #1e2345';
    }, 300);
    setTimeout(() => {
        signInInfo.style.display = 'none';
    }, 150);
    setTimeout(() => {
        singIn.style.display = 'flex';
        reg.style.display = 'none';
    }, 250);
})

mobileSignIn.addEventListener('click', () => {
    reg.style.left = '-100%';
    singIn.style.left = '0%';
    // singIn.style.display = 'flex';
})

const signInForm = document.querySelector('.signIn form');

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector('.name');
    const username = document.querySelector(".userName");
    const password = document.querySelector('.password');

    if(name.value.length == 0){
        name.value = '';
        name.setAttribute('placeholder', 'Name is required');
    }
    else if(name.value.length > 20 ){
        name.value = '';
        name.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if(username.value.length == 0){
        username.value = '';
        username.setAttribute('placeholder', 'Username is required');
    }
    else if(username.value.length > 20){
        username.value = '';
        username.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if(password.value.length < 8 || password.value.length > 20){
        password.value = '';
        password.setAttribute("placeholder", 'must be 8-20 chars');
    }
    else{
        signInForm.submit();
    }
})

const regForm = document.querySelector(".reg form");

regForm.addEventListener("submit", async (e) => {
    console.log('in ')
    e.preventDefault();
    const username = document.querySelector(".reg form .userName");
    const password = document.querySelector('.reg form .password');

    if(username.value.length == 0){
        username.value = '';
        username.setAttribute('placeholder', 'Username is required');
    }
    else if(username.value.length > 20){
        username.value = '';
        username.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if(password.value.length < 8 || password.value.length > 20){
        password.value = '';
        password.setAttribute("placeholder", 'must be 8-20 chars');
    }
    else{
        regForm.submit();
    }
})