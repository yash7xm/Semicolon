const singInBtn = document.getElementById('singInBtn');
const singUpBtn = document.getElementById('singUpBtn');
const info = document.querySelector('.info');
const container = document.querySelector('.container');
const heading = document.querySelector('.heading');
const signInInfo = document.querySelector('.signIn-info')
const regInfo = document.querySelector('.reg-info');
const singIn = document.querySelector('.signIn');
const reg = document.querySelector('.reg');
const mobileSignIn = document.querySelector('.mobile-signIn-btn button');
const mouseCaret = document.querySelector('.mouseCaret');
const logo = document.querySelector('.logo');
const h1 = document.querySelectorAll('h1');
const acc = document.querySelectorAll('.acc');
const label = document.querySelectorAll('label');
const input = document.querySelectorAll('input');

let clickCounter = 0;

window.addEventListener('mousemove', (e) => {
    mouseCaret.style.top = e.pageY + 'px';
    mouseCaret.style.left = e.pageX + 'px';
})

window.addEventListener('resize', () => {
    window.location.reload();
})

logo.addEventListener('mouseover', () => {
    mouseCaret.classList.add('caret-grow');
})
logo.addEventListener('mouseleave', () => {
    mouseCaret.classList.remove('caret-grow');
})

h1.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
    })
})

acc.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.add('caret-grow');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.remove('caret-grow');
    })
})

label.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.add('mouseCaret');
    })
})

input.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCaret.classList.remove('mouseCaret');
    })
    link.addEventListener('mouseleave', () => {
        mouseCaret.classList.add('mouseCaret');
    })
})

singInBtn.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})

singInBtn.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

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

singUpBtn.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})

singUpBtn.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
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
})

const signInForm = document.querySelector('.signIn form');
const signInFormBtn = document.querySelector('.signIn form button');

signInFormBtn.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})

signInFormBtn.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector('.name');
    const username = document.querySelector(".userName");
    const password = document.querySelector('.password');

    if (name.value.length == 0) {
        name.value = '';
        name.setAttribute('placeholder', 'Name is required');
    }
    else if (name.value.length > 20) {
        name.value = '';
        name.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if (username.value.length == 0) {
        username.value = '';
        username.setAttribute('placeholder', 'Username is required');
    }
    else if (username.value.length > 20) {
        username.value = '';
        username.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if (password.value.length < 8 || password.value.length > 20) {
        password.value = '';
        password.setAttribute("placeholder", 'must be 8-20 chars');
    }
    else {
        signInForm.submit();
    }
})

const regForm = document.querySelector(".reg form");
const signUpFormBtn = document.querySelector('.reg form button');

signUpFormBtn.addEventListener('mouseover', () => {
    mouseCaret.classList.remove('mouseCaret');
})

signUpFormBtn.addEventListener('mouseleave', () => {
    mouseCaret.classList.add('mouseCaret');
})

regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector(".reg form .userName");
    const password = document.querySelector('.reg form .password');

    if (username.value.length == 0) {
        username.value = '';
        username.setAttribute('placeholder', 'Username is required');
    }
    else if (username.value.length > 20) {
        username.value = '';
        username.setAttribute('placeholder', 'must be < 20 chars');
    }
    else if (password.value.length < 8 || password.value.length > 20) {
        password.value = '';
        password.setAttribute("placeholder", 'must be 8-20 chars');
    }
    else {
        regForm.submit();
    }
})