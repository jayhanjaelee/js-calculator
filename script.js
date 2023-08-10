import Calculator from "./Calculator.js";

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

/* keybaord shortcut */
const operations = ["+", "-", "*", "/"];

document.addEventListener("keydown", (event) => {
  let keyName = event.key;
  const isMetaKeyPressed = event.metaKey;

  /* Number Check */
  const isNumber = isFinite(keyName);
  if (isNumber) {
    calculator.appendNumber(keyName);
    return;
  }

  /* Operation Check */
  if (operations.indexOf(keyName) !== -1) {
    if (keyName === "/") {
      keyName = "÷";
    }

    calculator.chooseOperation(keyName);
    calculator.updateDisplay();
    return;
  }

  /* Equal Check */
  if (keyName === "=") {
    calculator.compute();
    calculator.updateDisplay();
    return;
  }

  /* Backspace Check */
  if (keyName === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }

  /* All Clear Check (Cmd + Backspace) */
  if (keyName === "Backspace" && isMetaKeyPressed) {
    calculator.clear();
    calculator.updateDisplay();
  }
});
