const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// function divide(a, b) {
//     let invalidInput = false;
//     let quotient = 0;
// }

const clear = () => (inputField.value = "");

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
let hasPendingOperator = false;

buttonsInputOperator.forEach((button) => {
    switch (button.value) {
        case "clear":
            button.addEventListener("click", () => clear());
            break;
        case "backspace":
            button.addEventListener("click", () => {
                const newString = inputField.value.slice(0, -1);
                inputField.value = newString;
            });
            break;
        default:
            break;
    }
});

buttonsMathOperator.forEach((button) => {
    switch (button.value) {
        case "+":
            button.addEventListener("click", () => {
                operator = "+";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "-":
            button.addEventListener("click", () => {
                operator = "-";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "*":
            button.addEventListener("click", () => {
                operator = "*";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "/":
            button.addEventListener("click", () => {
                operator = "/";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "=":
            button.addEventListener("click", () => {
                num2 = +inputField.value;
                result = operate(num1, operator, num2);
                num1 = result;
                inputField.value = result;
                console.log(result);
            });
        default:
            break;
    }
});

buttonsNum.forEach((button) => {
    button.addEventListener("click", () => {
        if (hasPendingOperator) {
            clear();
            hasPendingOperator = false;
        }
        inputField.value += button.value;
        // console.log(button.value);
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
