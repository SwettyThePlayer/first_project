console.log("script.js is running!")

const nameInput = document.querySelector('#name-input');
const greetBtn = document.querySelector('#greet-btn');
const output = document.querySelector("#output");

function greet() {
    const name = nameInput.value;
    output.textContent = `Hi ${name}!`;
}

greetBtn.addEventListener("click", greet);

const themeBtn = document.querySelector("#theme-btn");

function toggleTheme() {
    document.body.classList.toggle("dark");
}

themeBtn.addEventListener("click", toggleTheme);