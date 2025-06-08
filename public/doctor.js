// JavaScript source code
let loginbutton = document.getElementById("togglebutton");
let signinbutton = document.getElementById("toggleloginbutton");
let container = document.getElementById("c");
let siginpage = document.getElementById("sign")
let loginpage = document.getElementById("log")
signinbutton.addEventListener("click", () => {

    container.classList.add("toggle");
    setTimeout(() => {
        loginpage.hidden = true;
        siginpage.removeAttribute("hidden");
    }, 3000)
    setTimeout(() => {
        container.classList.remove("toggle");
    }, 6000)

})
loginbutton.addEventListener("click", () => {
    
    container.classList.add("toggle");
    setTimeout(() => {
        siginpage.hidden = true;
        loginpage.removeAttribute("hidden");
    }, 3000)
    setTimeout(() =>{
        container.classList.remove("toggle");
    }, 6000)

})
