const calculator = {
    numberElements: document.querySelectorAll('.number'),
    operatorElements: document.querySelectorAll('.operator'),
    display: document.querySelector('.displayText'),
}

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

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
        default:
            break;
    }
}

calculator.numberElements.forEach((number) => {
    number.addEventListener('click', () => {
        // Checks if there already is another . in there
        if (number.dataset.number == '.' && calculator.display.textContent.includes('.')) return;
        // Removes the 0 if a number is pressed
        if (number.dataset.number != '.' && calculator.display.textContent == '0') calculator.display.textContent = '';
        calculator.display.textContent = calculator.display.textContent + number.dataset.number;
        if (storedOperator == '') { // If no operator, store first text
            currentNumber = Number(calculator.display.textContent);
        } else { //Stores the number after operator
            let textAfterOperator = calculator.display.textContent.slice(storedNumber.toString().length+1);
            currentNumber = Number(textAfterOperator);
        }
        console.log(currentNumber);
    })
})

calculator.operatorElements.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (storedOperator != '') return
        calculator.display.textContent += operator.dataset.operator;
        storedOperator = operator.dataset.operator;
        storedNumber = currentNumber;
        currentNumber = 0
    })
})

let storedNumber = 0;
let currentNumber = 0;
let storedOperator = '';