//OPERATE FUNCTIONS
function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '−':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

function filterDisplay(e) {

    //delete leading zero
    if (display.textContent === '0' && (e.target.textContent !== '.' && e.target.classList[0] !== 'operator')) {
        display.textContent = '';
        currentNumber = '';
    }

    //disable showing operators in main display
    if (e.target.classList[0] == 'operator') {
        digit = '';
        return;
    }

    //disable having 2 decimals
    if ((currentNumber.includes('.') && e.target.textContent === '.') || (currentOperator === '=' && e.target.textContent === '.' && num1 !== '')) {
        digit = '';
        return;
    } else {
        digit = e.target.textContent;
    }
}


function updateDisplay() {

    if (currentOperator !== '' && currentOperator !== '=' && secondNumber === '') {
        display.textContent = '';
    }
    //add currentNumber to display
    display.textContent += digit;
    currentNumber += digit;
}

function clear() {
    digit = 0;
    currentNumber = '';
    num1 = '';
    currentOperator = '';
    result = '';
    secondNumber = '';
    prevOperator = '';
    display.textContent = 0;
}

function deleteNum() {
    let string = String(display.textContent).slice(0, -1);
    currentNumber = Number(string);
    display.textContent = currentNumber;
}

function main(e) {
    filterDisplay(e);
    updateDisplay();

    //if first number and second number are entered, and current input is an operator, solve
    if (e.target.classList[0] === 'operator' && (num1 !== '' && secondNumber !== '')) {
        result = operate(num1, secondNumber, currentOperator);

        //display result and use it for next equation
        display.textContent = Math.round(result * 1000) / 1000;
        num1 = Number(result);
        secondNumber = '';
        currentNumber = '';
        currentOperator = e.target.textContent;
        return;
    }

    //if input is a first number, store it into num1
    if (currentOperator === '' && e.target.classList[0] === 'button') {
        num1 += digit;
        return;
    }

    //if input is an operator, store it
    if (e.target.classList[0] === 'operator') {

        //if a saved operator doesn't exist, save it to the first one
        if (currentOperator === '') {
            currentOperator = e.target.textContent;
            currentNumber = '';
        } else {
            //if it does exist, save the first one to prev, and update the current one
            prevOperator = currentOperator;
            currentOperator = e.target.textContent;
        }
        return;
    }

    //if input is a second number
    if (num1 !== '' && e.target.classList[0] === 'button') {
        secondNumber += digit;
        return;
    }
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
let digit = 0;
let currentNumber = '';
let num1 = '';
let currentOperator = '';
let result = '';
let secondNumber = '';
let prevOperator = '';