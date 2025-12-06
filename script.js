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

const defaultButtonBg = "#323232";

function add(a, b) {
    let sum = a + b;
    return parseFloat(sum.toFixed(4));
}

function subtract(a, b) {
    let difference = a - b;
    return parseFloat(difference.toFixed(4));
}

function multiply(a, b) {
    let product = a * b;
    return parseFloat(product.toFixed(4));
}

function divide(a, b) {
    if (b === 0) {
        console.log("Cannot be divided by 0");
        clear();
        return 0;
    }
    let quotient = a / b;
    return parseFloat(quotient.toFixed(4));
}

function clear() {
    inputField.value = "";
    num1 = 0;
    num2 = 0;
    result = 0;
    operator = "";
    hasPendingOperator = false;

    buttonsMathOperator.forEach((btn) => {
        if (btn.value !== "=") {
            btn.style.backgroundColor = defaultButtonBg;
        }
    });
}

buttonsInputOperator.forEach((button) => {
    switch (button.value) {
        case "clear":
            button.addEventListener("click", () => {
                lastClickedButton = button;
                clear();
            });
            break;
        case "backspace":
            button.addEventListener("click", () => {
                lastClickedButton = button;
                const newString = inputField.value.slice(0, -1);
                inputField.value = newString;
            });
            break;
        default:
            break;
    }
});

// This is separate from operate() because resolvePendingOperation() deals with the actual storing of the relevant
// numbers and preserving the previous number used in the operation
function resolvePendingOperation() {
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
                changeBtnColor(button);
                handleOperatorInput("+", button);
            });
            break;
        case "-":
            button.addEventListener("click", () => {
                changeBtnColor(button);
                handleOperatorInput("-", button);
            });
            break;
        case "*":
            button.addEventListener("click", () => {
                changeBtnColor(button);
                handleOperatorInput("*", button);
            });
            break;
        case "/":
            button.addEventListener("click", () => {
                changeBtnColor(button);
                handleOperatorInput("/", button);
            });
            break;
        case "=":
            button.addEventListener("click", () => {
                if (
                    !hasPendingOperator ||
                    operators.includes(lastClickedButton.value)
                )
                    return;

                changeBtnColor(button);
                lastClickedButton = button;
                num2 = +inputField.value;
                result = operate(num1, operator, num2);
                num1 = result;
                num2 = 0;
                inputField.value = result;
                hasPendingOperator = false;
            });
            break;
        default:
            break;
    }
});

buttonsNum.forEach((button) => {
    button.addEventListener("click", () => {
        if (lastClickedButton && lastClickedButton.value === "=") {
            inputField.value = "";
        }
        // prevents input field from clearing when hasPendingOperator is true
        if (lastClickedButton && !isNaN(lastClickedButton.value)) {
            inputField.value += button.value;
            return;
        }

        if (hasPendingOperator) inputField.value = "";

        lastClickedButton = button;
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

function changeBtnColor(button) {
    buttonsMathOperator.forEach((btn) => {
        if (btn.value === "=") return;
        btn.style.backgroundColor = defaultButtonBg;
    });

    if (button.value !== "=") button.style.backgroundColor = "green";
}

function handleOperatorInput(operatorValue, button) {
    if (lastClickedButton && operators.includes(lastClickedButton.value)) {
        lastClickedButton = button;
        operator = operatorValue;
        return;
    } else if (hasPendingOperator) {
        resolvePendingOperation();
    }

    lastClickedButton = button;
    operator = operatorValue;
    num1 = +inputField.value;
    hasPendingOperator = true;
}
