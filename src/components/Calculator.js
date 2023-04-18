import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  //take input
  const inputHandler = (event) => {
    if (answer === "Invalid Input!!") return;
    let val = event.target.innerText;
    let str = input + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    } 
    else 
      setInput(str);
  };

  //implement AC
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  // calculate final answer
  const calculateAns = () => {
    if (input === "") return;
    let result = 0;
    let finalexpression = input;
    finalexpression = finalexpression.replaceAll("x", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");

    try {
      result = evaluate(finalexpression); //mathjs library
    } 
    catch (error) {
      result =
        error.message === "Invalid Input!!"; //error message;
    }
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
  };

  // implement backspace
  const backspace = () => {
    if (answer !== "") {
      setInput(answer.toString().slice(0, -1));
      setAnswer("");
    } else setInput((prev) => prev.slice(0, -1));
  };

  // change sign of expression
  const changePlusMinus = () => {
    if (answer === "Invalid Input!!") return;
    else if (answer !== "") {
      let ans = answer.toString();
      if (ans.charAt(0) === "-") 
        setInput("+".concat(ans.slice(1, ans.length)));
      else if (ans.charAt(0) === "+")
        setInput("-".concat(ans.slice(1, ans.length)));
      else 
        setInput("-".concat(ans));
      setAnswer("");
    }
    else {
      if (input.charAt(0) === "-")
        setInput((prev) => "+".concat(prev.slice(1, prev.length)));
      else if (input.charAt(0) === "+")
        setInput((prev) => "-".concat(prev.slice(1, prev.length)));
      else
        setInput((prev) => "-".concat(prev));
    }
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <Display input={input} setInput={setInput} answer={answer} />
          <Buttons
            inputHandler={inputHandler}
            clearInput={clearInput}
            backspace={backspace}
            changePlusMinus={changePlusMinus}
            calculateAns={calculateAns}
          />
        </div>
      </div>
    </>
  );
}

export default Calculator;
