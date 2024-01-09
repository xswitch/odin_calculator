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

function clear() {
    calculator.display.textContent = '0'
    calculator.displayStored.textContent = '0'
    storedNumber = 0;
    storedOperator = ''
    currentNumber = 0;
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
            let textAfterOperator = calculator.display.textContent.slice(storedNumber.toString().length+3);
            currentNumber = Number(textAfterOperator);
        }
    })
})

calculator.operatorElements.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (storedOperator != '' && storedNumber != 0 && currentNumber != 0) {
            const result = operate(storedOperator, storedNumber, currentNumber).toFixed(2)
            storedNumber = result;
            currentNumber = 0;
            storedOperator = operator.dataset.operator;
            calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
            calculator.display.textContent = ` ${storedNumber} ${storedOperator} `
            console.log(result)
        } else { //If no number exists store it and operator
            if (storedNumber == 0) {
                storedOperator = operator.dataset.operator;
                storedNumber = currentNumber;
                calculator.display.textContent = `${storedNumber} ${operator.dataset.operator} `;
                currentNumber = 0
            } else { // else store a new operator but keep number
                storedOperator = operator.dataset.operator;
                calculator.display.textContent = `${storedNumber} ${operator.dataset.operator} `;
            }
        }
    })
})

document.querySelector('.equal').addEventListener('click', () => {
    if (storedNumber != 0 && currentNumber != 0 && storedOperator != 0) {
        const result = operate(storedOperator, storedNumber, currentNumber).toFixed(2)
        calculator.displayStored.textContent = `${calculator.display.textContent} = ${result}`;
        calculator.display.textContent = result;

        storedNumber = result
        currentNumber = 0;
    }
})

calculator.clearButton.addEventListener('click', clear);

let storedNumber = 0;
let currentNumber = 0;
let storedOperator = '';