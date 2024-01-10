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
    firstNumber = 0;
    storedOperator = ''
    secondNumber = 0;
}

function updateDisplay() {
    calculator.display.textContent = `${firstNumber} ${storedOperator} ${secondNumber}`
}

calculator.numberElements.forEach((number) => {
    number.addEventListener('click', () => {
        const num = number.dataset.number;
        if (storedOperator == '') { //First number
            // checks for double 0 at the start
            if (firstNumber == '0' && num == '0') return
            // Checks for multiple decimals
            if (firstNumber.includes('.') && num == '.') return;

            // Don't remove 0 if '.' is pressed, otherwise remove it. or if 0 is not first, add onto
            if (firstNumber == '0' && num == '.') {
                firstNumber += num;
            } else if (firstNumber == '0') {
                firstNumber = num;
            } else {
                firstNumber += num;
            }
            console.log(firstNumber);
        } else { //Second number
            // checks for double 0 at the start
            if (secondNumber == '0' && num == '0') return
            // Checks for multiple decimals
            if (secondNumber.includes('.') && num == '.') return;

            // Don't remove 0 if '.' is pressed, otherwise remove it. or if 0 is not first, add onto
            if (secondNumber == '0' && num == '.') {
                secondNumber += num;
            } else if (secondNumber == '0') {
                secondNumber = num;
            } else {
                secondNumber += num;
            }
            console.log(secondNumber);
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
            firstNumber = result
            secondNumber = '';
        } else if (Number(firstNumber) != 0) {
            storedOperator = curOperator;
        }
        updateDisplay()
    })
})

document.querySelector('.equal').addEventListener('click', () => {
    if (storedNumber != 0 && currentNumber != 0 && storedOperator != 0) {
        const result = operate(storedOperator, storedNumber, currentNumber)
        calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
        calculator.display.textContent = result;

        storedNumber = result
        currentNumber = 0;
    }
})

calculator.clearButton.addEventListener('click', clear);

// first number, operator, second number
let states = [0, '', 0]
let currentState = 0;
let firstNumber = '0'
let secondNumber = ''
let storedOperator = '';