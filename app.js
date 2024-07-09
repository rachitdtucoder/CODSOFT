const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let firstOperand = null;
let secondOperand = false;
let operator = null;

function updateDisplay() {
    display.innerText = displayValue;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { value } = button.dataset;

        switch (value) {
            case 'C':
                displayValue = '0';
                firstOperand = null;
                secondOperand = false;
                operator = null;
                break;
            case '=':
                if (operator && firstOperand !== null) {
                    displayValue = String(operate(firstOperand, displayValue, operator));
                    firstOperand = null;
                    secondOperand = false;
                    operator = null;
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if (firstOperand === null) {
                    firstOperand = displayValue;
                } else if (operator) {
                    displayValue = String(operate(firstOperand, displayValue, operator));
                    firstOperand = displayValue;
                }
                operator = value;
                secondOperand = true;
                break;
            default:
                if (secondOperand) {
                    displayValue = value;
                    secondOperand = false;
                } else {
                    displayValue = displayValue === '0' ? value : displayValue + value;
                }
                break;
        }
        updateDisplay();
    });
});

function operate(first, second, operator) {
    const a = parseFloat(first);
    const b = parseFloat(second);
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator === '*') return a * b;
    if (operator === '/') return a / b;
    return second;
}

updateDisplay();
