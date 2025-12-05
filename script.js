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

// function divide(a, b) {
//     let invalidInput = false;
//     let quotient = 0;
// }

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

function calculate(num1, operator, num2) {
    num2 = +inputField.value;
    inputField.value = "";
    result = operate(num1, operator, num2);
    num1 = result;
    inputField.value = result;
    hasPendingOperator = false;
}

buttonsMathOperator.forEach((button) => {
    switch (button.value) {
        case "+":
            button.addEventListener("click", () => {
                if (hasPendingOperator) calculate(num1, operator, num2);

                operator = "+";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "-":
            button.addEventListener("click", () => {
                if (hasPendingOperator) calculate(num1, operator, num2);

                operator = "-";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "*":
            button.addEventListener("click", () => {
                if (hasPendingOperator) calculate(num1, operator, num2);

                operator = "*";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "/":
            button.addEventListener("click", () => {
                // if (num2 === 0 && hasPendingOperator) {
                //     console.log("Cannot be divided by 0");
                //     clear();
                //     return;
                // }
                if (hasPendingOperator) calculate(num1, operator, num2);

                operator = "/";
                num1 = +inputField.value;
                hasPendingOperator = true;
            });
            break;
        case "=":
            button.addEventListener("click", () => {
                // if (num2 === 0 && operator === "/") {
                //     console.log("Cannot be divided by 0");
                //     clear();
                //     return;
                // }
                if (!hasPendingOperator) return;

                num2 = +inputField.value;
                result = operate(num1, operator, num2);
                num1 = result;
                inputField.value = result;
                hasPendingOperator = false;
                console.log(result);
            });
        default:
            break;
    }
});

buttonsNum.forEach((button) => {
    button.addEventListener("click", () => {
        if (hasPendingOperator) inputField.value = "";

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
