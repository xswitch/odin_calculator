const calculator = {
    numberElements: document.querySelectorAll('.number'),
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
        if (number.dataset.number != '.' && calculator.display.textContent == '0') calculator.display.textContent = ''
        calculator.display.textContent = calculator.display.textContent + number.dataset.number;
        currentNumber = Number(calculator.display.textContent)
        console.log(currentNumber);
    })
})
let storedNumber = 0;
let currentNumber = 0;
let operator = '';