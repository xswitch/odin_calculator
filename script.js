const calculator = {
    numberElements: document.querySelectorAll('.number'),
    operatorElements: document.querySelectorAll('.operator'),
    display: document.querySelector('.displayText'),
    displayStored: document.querySelector('.displayStored'),
    clearButton: document.querySelector('#clear'),
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
    let result;
    switch (operator) {
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case '*':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
        default:
            break;
    }
    return (result % 1 == 0) ? result : result.toFixed(2) 
}

function clear() {
    calculator.display.textContent = '0'
    calculator.displayStored.textContent = '0'
    firstNumber = '0';
    storedOperator = ''
    secondNumber = '';
}

function updateDisplay() {
    calculator.display.textContent = `${firstNumber} ${storedOperator} ${secondNumber}`
}

function checkNumInput(input, num) {
    // checks for double 0 at the start
    if (num == '0' && input == '0') return num;
    // Checks for multiple decimals
    if (num.includes('.') && input == '.') return num;

    // Don't remove 0 if '.' is pressed, otherwise remove it. or if 0 is not first, add onto
    if (num == '0' && input == '.') {
        num += input;
    } else if (num == '0') {
        num = input;
    } else if (num == '' && input == '.') {
        num = '0.'
    } else {
        num += input;
    }
    return num;
}

calculator.numberElements.forEach((number) => {
    number.addEventListener('click', () => {
        const num = number.dataset.number;
        if (storedOperator == '') { //First number
            firstNumber = checkNumInput(num, firstNumber)
        } else { //Second number
            // checks for double 0 at the start
            secondNumber = checkNumInput(num, secondNumber)
        }
        updateDisplay()
    })
})

calculator.operatorElements.forEach((operator) => {
    operator.addEventListener('click', () => {
        const curOperator = operator.dataset.operator
        if (firstNumber == 0 && secondNumber == 0) return;

        // Checks if everything is there
        // Operator is not empty
        // 1 and 2 num has a number above or below 0
        if (firstNumber != '0' && storedOperator != '' && secondNumber != '' && Number(secondNumber) != 0 && Number(firstNumber) != 0) {
            console.table(firstNumber, secondNumber, storedOperator)

            const result = operate(storedOperator, Number(firstNumber), Number(secondNumber))
            storedOperator = curOperator;
            firstNumber = result.toString()
            secondNumber = '';
            calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
        } else if (Number(firstNumber) != 0) {
            storedOperator = curOperator;
        }
        updateDisplay()
    })
})

document.querySelector('.equal').addEventListener('click', () => {
    if (Number(firstNumber) != 0 && Number(secondNumber) != 0 && storedOperator != '') {
        const result = operate(storedOperator, Number(firstNumber), Number(secondNumber))
        calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
        calculator.display.textContent = result;

        firstNumber = result.toString()
        secondNumber = '';
        storedOperator = ''
        updateDisplay()
    }
})

calculator.clearButton.addEventListener('click', clear);

// first number, operator, second number
let firstNumber = '0'
let secondNumber = ''
let storedOperator = '';