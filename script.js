const calculator = {
    numberElements: document.querySelectorAll('.number'),
    operatorElements: document.querySelectorAll('.operator'),
    display: document.querySelector('.displayText'),
    displayStored: document.querySelector('.displayStored'),
    clearButton: document.querySelector('#clear'),
    equalButton: document.querySelector('.equal'),
    backspaceButton: document.querySelector('.backspace'),
    negativeButton: document.querySelector('#negative'),
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
    calculator.displayStored.textContent = ''
    firstNumber = '0';
    storedOperator = ''
    secondNumber = '';
}

function backSpace() {
    if (storedOperator == '') {
        if (firstNumber.length <= 1) {
            firstNumber = '0';   
        } else {
            firstNumber = firstNumber.slice(0, firstNumber.length-1)
        }
    } else {
        if (secondNumber.length <= 1) {
            secondNumber = '0'
        } else {
        secondNumber = secondNumber.slice(0, secondNumber.length-1)
        }
    }
    updateDisplay()
}

function updateDisplay() {
    calculator.display.textContent = `${firstNumber} ${storedOperator} ${secondNumber}`
}

function changeNegative() {
    if (storedOperator == '') {
        if (firstNumber[0] == '-') {
            firstNumber = firstNumber.slice(1);
        } else {
            firstNumber = `-${firstNumber}`
        }
    } else {
        if (secondNumber[0] == '-') {
            secondNumber = secondNumber.slice(1);
        } else {
            secondNumber = `-${secondNumber}`
        }
    }
    updateDisplay()
}

function checkNumInput(input, num) {
    // Allow a single 0 to be insert if number is empty
    if (num == '' && input == '0') return '0'
    // Allow for more 0's if there is a decimal
    if (num.includes('.') && input == '0') return num + '0'
    // checks for double 0 at the start
    if (Number(num) == 0 && input == '0') return num;
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

function addNumber(e) {
    const num = e.target.dataset.number;
    if (storedOperator == '') { //First number
        firstNumber = checkNumInput(num, firstNumber)
    } else { //Second number
        secondNumber = checkNumInput(num, secondNumber)
    }
    updateDisplay()
}

function addOperator(e) {
    const curOperator = e.target.dataset.operator
    if (firstNumber == 0 && secondNumber == 0) return;

    // Checks if everything is there
    // Operator is not empty
    // 1 and 2 num has a number above or below 0
    if (firstNumber != '0' && storedOperator != '' && secondNumber != '' && Number(secondNumber) != 0 && Number(firstNumber) != 0) {
        // Operate if all values are already there
        const result = operate(storedOperator, Number(firstNumber), Number(secondNumber))
        storedOperator = curOperator;
        firstNumber = result.toString()
        secondNumber = '';
        calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
    } else if (Number(firstNumber) != 0) {
        storedOperator = curOperator;
    }
    updateDisplay()
}

// All event listeners
calculator.equalButton.addEventListener('click', () => {
    if (Number(firstNumber) != 0 && Number(secondNumber) != 0 && storedOperator != '') {
        const result = operate(storedOperator, Number(firstNumber), Number(secondNumber))
        calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;

        firstNumber = result.toString()
        secondNumber = '';
        storedOperator = ''
        updateDisplay()
    }
})

calculator.backspaceButton.addEventListener('click', backSpace);
calculator.negativeButton.addEventListener('click', changeNegative)

calculator.numberElements.forEach((number) => {
    number.addEventListener('click', addNumber)
})

calculator.operatorElements.forEach((operator) => {
    operator.addEventListener('click', addOperator)
})

calculator.clearButton.addEventListener('click', clear);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault()
        calculator.equalButton.click()
    }
    if (e.key == 'Backspace') calculator.backspaceButton.click()
    if (e.key == 'Delete' || e.key == 'c') calculator.clearButton.click()

    calculator.numberElements.forEach(number => {
        if (number.dataset.number == e.key) number.click();
    });

    calculator.operatorElements.forEach(operator => {
        if (operator.dataset.operator == e.key) operator.click();
    })
})

// first number, operator, second number
let firstNumber = '0'
let secondNumber = ''
let storedOperator = '';