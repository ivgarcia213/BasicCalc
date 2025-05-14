import React, { useState } from "react";
import "./App.css";

const SimpleCalculator = ({ onSwitch }) => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // Use JavaScript's built-in eval but handle it safely
      let result = new Function("return " + input)(); // Safer eval

      if (isNaN(result)) throw new Error("Invalid Calculation");
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">{input}</div>
      <div className="button-container">
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleClick("/")}>/</button>
      </div>
      <button className="switch-button" onClick={onSwitch}>
        Switch to Scientific
      </button>
    </div>
  );
};

const ScientificCalculator = ({ onSwitch }) => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // Handle scientific functions manually
      let result = input;

      // Replace scientific functions with Math functions
      result = result.replace(/sin\(/g, "Math.sin(");
      result = result.replace(/cos\(/g, "Math.cos(");
      result = result.replace(/tan\(/g, "Math.tan(");
      result = result.replace(/log\(/g, "Math.log10("); // log base 10
      result = result.replace(/sqrt\(/g, "Math.sqrt("); // sqrt

      // Evaluate the expression using a safer approach
      let finalResult = new Function("return " + result)(); // Safer eval

      if (isNaN(finalResult)) throw new Error("Invalid Calculation");
      setInput(finalResult.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">{input}</div>
      <div className="button-container">
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleClick("/")}>/</button>

        {/* Scientific buttons */}
        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("tan(")}>tan</button>
        <button onClick={() => handleClick("log(")}>log</button>
        <button onClick={() => handleClick(")")}>)</button>
        <button onClick={() => handleClick("sqrt(")}>√</button>
      </div>
      <button className="switch-button" onClick={onSwitch}>
        Switch to Simple
      </button>
    </div>
  );
};

const App = () => {
  const [isScientific, setIsScientific] = useState(false);

  const handleSwitchMode = () => {
    setIsScientific(!isScientific);
  };

  return (
    <div className="app">
      {isScientific ? (
        <ScientificCalculator onSwitch={handleSwitchMode} />
      ) : (
        <SimpleCalculator onSwitch={handleSwitchMode} />
      )}
    </div>
  );
};

export default App;
