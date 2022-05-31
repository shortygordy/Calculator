//OPERATE FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    operator(num1, num2);
}

function filterDisplay(e) {

    //delete leading zero
    if (display.textContent === '0' && (e.target.textContent !== '.' && e.target.classList[0] !== 'operator')) {
        display.textContent = '';
        number = '';
    }

    //disable having 2 decimals, or showing the operators in main display
    if ((display.textContent.includes('.') && e.target.textContent === '.') || e.target.classList[0] == 'operator') {
        currentInput = '';
        return;
    }
    //otherwise, set current input to the clicked button
    else currentInput = e.target.textContent;
}

function updateDisplay() {

    //add number to display
    display.textContent += currentInput;
    number += currentInput;
}

function clear() {
    currentInput = 0;
    display.textContent = 0;
    number = 0;
}

function deleteNum() {
    let string = String(number).slice(0, -1);
    number = Number(string);
    display.textContent = number;
}

function main(e) {
    filterDisplay(e);
    updateDisplay();
}


//capture elements
const inputButtons = document.querySelectorAll('#inputButtons div');
const functionButtons = document.querySelectorAll('#functionButtons div');
const display = document.querySelector('.display');

//add event listeners
inputButtons.forEach(div => div.addEventListener('mousedown', (e) => div.classList.add('pressedDown')));
inputButtons.forEach(div => div.addEventListener('mouseup', (e) => div.classList.remove('pressedDown')));
functionButtons.forEach(div => div.addEventListener('mousedown', (e) => div.classList.add('pressedDown')));
functionButtons.forEach(div => div.addEventListener('mouseup', (e) => div.classList.remove('pressedDown')));
inputButtons.forEach(div => div.addEventListener('click', (e) => main(e)));
functionButtons[0].addEventListener('click', clear);
functionButtons[1].addEventListener('click', deleteNum);


//declare global variables
let currentInput = 0;
let number = 0;