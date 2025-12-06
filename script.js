// todo: decimal points, and removing .000

function add(a, b) {
    let sum = a + b;
    return sum.toFixed(4);
}

function subtract(a, b) {
    let difference = a - b;
    return difference.toFixed(4);
}

function multiply(a, b) {
    let product = a * b;
    return product.toFixed(4);
}

function divide(a, b) {
    if (b === 0) {
        console.log("Cannot be divided by 0");
        clear();
        return 0;
    }
    let quotient = a / b;
    return quotient.toFixed(4);
}

function clear() {
    inputField.value = "";
    num1 = 0;
    num2 = 0;
    result = 0;
    operator = "";
    hasPendingOperator = false;
}

const inputField = document.querySelector("#input-field");

const inputOperators = document.querySelector(".input-operators");
const buttonsInputOperator = [...inputOperators.querySelectorAll("button")];

const mathOperators = document.querySelector(".math-operators");
const buttonsMathOperator = [...mathOperators.querySelectorAll("button")];

const numbers = document.querySelector(".numbers");
const buttonsNum = [...numbers.querySelectorAll("button")];

let num1 = 0,
    num2 = 0,
    result = 0;
let operator = "";
const operators = ["+", "-", "*", "/"];
let hasPendingOperator = false;
let lastClickedButton;

buttonsInputOperator.forEach((button) => {
    switch (button.value) {
        case "clear":
            button.addEventListener("click", () => {
                lastClickedButton = button.value;
                clear();
            });
            break;
        case "backspace":
            button.addEventListener("click", () => {
                lastClickedButton = button.value;
                const newString = inputField.value.slice(0, -1);
                inputField.value = newString;
            });
            break;
        default:
            break;
    }
});

function calculate(num1, operator, num2) {
    num2 = +inputField.value;
    inputField.value = "";
    result = operate(num1, operator, num2);
    num1 = result;
    num2 = 0;
    inputField.value = result;
    hasPendingOperator = false;
}

buttonsMathOperator.forEach((button) => {
    switch (button.value) {
        case "+":
            button.addEventListener("click", () => {
                if (operators.includes(lastClickedButton)) {
                    lastClickedButton = button.value;
                    operator = "+";
                    return;
                } else if (hasPendingOperator) {
                    calculate(num1, operator, num2);
                }

                lastClickedButton = button.value;
                operator = "+";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "-":
            button.addEventListener("click", () => {
                if (operators.includes(lastClickedButton)) {
                    lastClickedButton = button.value;
                    operator = "-";
                    return;
                } else if (hasPendingOperator) {
                    calculate(num1, operator, num2);
                }

                lastClickedButton = button.value;
                operator = "-";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "*":
            button.addEventListener("click", () => {
                if (operators.includes(lastClickedButton)) {
                    lastClickedButton = button.value;
                    operator = "*";
                    return;
                } else if (hasPendingOperator) {
                    calculate(num1, operator, num2);
                }

                lastClickedButton = button.value;
                operator = "*";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "/":
            button.addEventListener("click", () => {
                if (operators.includes(lastClickedButton)) {
                    lastClickedButton = button.value;
                    operator = "/";
                    return;
                } else if (hasPendingOperator) {
                    calculate(num1, operator, num2);
                }

                lastClickedButton = button.value;
                operator = "/";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "=":
            button.addEventListener("click", () => {
                if (
                    !hasPendingOperator ||
                    operators.includes(lastClickedButton)
                )
                    return;

                lastClickedButton = button.value;
                num2 = +inputField.value;
                result = operate(num1, operator, num2);
                num1 = result;
                num2 = 0;
                inputField.value = result;
                hasPendingOperator = false;
            });
        default:
            break;
    }
});

buttonsNum.forEach((button) => {
    button.addEventListener("click", () => {
        if (hasPendingOperator) inputField.value = "";

        lastClickedButton = button.value;
        inputField.value += button.value;
    });
});

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            break;
    }
}
