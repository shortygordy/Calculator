//declare global variables
let digit = 0;
let currentNumber = '';
let firstNumber = '';
let currentOperator = '';
let result = '';
let secondNumber = '';
let prevOperator = '';

//OPERATE FUNCTIONS
function add(firstNumber, num2) {
    return Number(firstNumber) + Number(num2);
}

function subtract(firstNumber, num2) {
    return Number(firstNumber) - Number(num2);
}

function multiply(firstNumber, num2) {
    return Number(firstNumber) * Number(num2);
}

function divide(firstNumber, num2) {
    return Number(firstNumber) / Number(num2);
}

function operate(firstNumber, num2, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, num2);
        case '−':
            return subtract(firstNumber, num2);
        case '×':
            return multiply(firstNumber, num2);
        case '÷':
            return divide(firstNumber, num2);
        case '':
            return;
    }
}

function filterInput(e) {

    display.style.fontSize = '30pt';

    //delete leading zero
    if (display.textContent === '0' && e.target.textContent !== '.' && !(e.target.classList[0] === 'operator' || e.target.classList[0] === 'equals')) {
        display.textContent = '';
    }

    //disable showing operators in main display
    if (e.target.classList[0] === 'operator') {
        digit = '';
        return;
    }



    //disable having 2 decimals
    if (e.target.textContent === '.' && String(currentNumber).includes('.') && (firstNumber === '' || secondNumber !== '')) {
        digit = '';
        return;
    }


    if ((display.textContent === '0' && e.target.textContent === '.') || (firstNumber !== '' && secondNumber === '' && e.target.textContent === '.')) {
        digit = '0.';
        currentNumber = '';
        return;
    } else {
        digit = e.target.textContent;
    }
}

function updateDisplay(e) {

    //don't show operators or equals
    if (e.target.classList[0] === 'operator' || e.target.classList[0] === 'equals') digit = '';

    //set display to current number
    display.textContent = currentNumber;
}

function clear() {
    digit = 0;
    currentNumber = '';
    firstNumber = '';
    currentOperator = '';
    secondNumber = '';
    prevOperator = '';
    display.textContent = 0;
    display.style.fontSize = '30pt';
}

function deleteNum() {
    let string = String(display.textContent).slice(0, -1);
    currentNumber = Number(string);
    display.textContent = currentNumber;
}

function divideByZero() {
    if ((secondNumber === '0' || secondNumber === '0.0') && prevOperator === '÷') {
        return true;
    }
}

function main(e) {
    filterInput(e);

    //if equals is entered without having a second number, reset all numbers
    if (e.target.textContent === '=' && secondNumber === '' && currentNumber === '') {
        clear();
        return;
    }

    //clear screen for second number
    if (currentOperator !== '' && currentOperator !== '=' && firstNumber !== '' && secondNumber === '' && e.target.classList[0] !== 'operator' && e.target.classList[0] !== 'equals') {
        console.log(e.target.classList[0]);
        display.textContent = '';
        currentNumber = '';
    }

    //if nothing has been entered, and a non-digit is pressed, do nothing
    if (e.target.classList[0] !== 'digit' && currentNumber === '') return;

    //if a number is pressed add it to current number
    if (e.target.classList[0] === 'digit') {
        currentNumber += digit;
    }

    //if there's no first number saved, and the current input is an operator, save to first number and save operator
    if (firstNumber === '' && e.target.classList[0] === 'operator') {
        firstNumber = currentNumber;
        currentOperator = e.target.textContent;
    }
    //if the first number is saved, and the current input is an operator, save the operator
    if (firstNumber !== '' && (e.target.classList[0] === 'operator' || e.target.classList[0] === 'equals')) {
        prevOperator = currentOperator;
        currentOperator = e.target.textContent;
    }

    //if the first number is saved, and the current input is a digit, save the current number to second number
    if (firstNumber !== '' && e.target.classList[0] === 'digit') {
        secondNumber += digit;
    }

    //if both numbers are saved, and the current input is an operator
    if (secondNumber !== '' && e.target.classList[0] === 'operator') {
        //solve
        if (divideByZero() === true) {
            clear();
            display.style.fontSize = '13pt';
            display.textContent = "Please don't divide by 0 ya filthy animal.";
            return;
        } else {
            result = operate(firstNumber, secondNumber, prevOperator);
            firstNumber = Math.round(result * 1000) / 1000;
            secondNumber = '';
            currentNumber = Math.round(result * 1000) / 1000;
            display.textContent = Math.round(result * 1000) / 1000;
            return;
        }
        //or current input is an equals
    } else if (secondNumber !== '' && e.target.classList[0] === 'equals') {
        if (divideByZero() === true) {
            clear();
            display.style.fontSize = '13pt';
            display.textContent = "Please don't divide by 0 ya filthy animal.";
            return;
        } else {
            result = operate(firstNumber, secondNumber, prevOperator);
            clear();
            firstNumber = Math.round(result * 1000) / 1000;
            currentNumber = Math.round(result * 1000) / 1000;
            display.textContent = Math.round(result * 1000) / 1000;
            return;
        }
    }
    updateDisplay(e);
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