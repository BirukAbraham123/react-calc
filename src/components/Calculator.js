import React, { Component } from "react";
import CButton from "./CButtons";
import FormInput from "./Input";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullInput: "",
      currentInput: "0",
      middleVal: null,
      isOperatorAtEnd: false,
      isEqualAtEnd: false,
      calcStack: [],
    };
  }

  handleCalcBtnClick(i) {
    switch (i) {
      case 0: {
        // clear
        this.clearInput();
        break;
      }
      case 1: {
        // +/-
        break;
      }
      case 2: {
        // %
        break;
      }
      case 3: {
        // /
        this.pushToFullHistory("/");
        break;
      }
      case 4: {
        // 7
        this.inputChangeHandler("7");
        break;
      }
      case 5: {
        // 8
        this.inputChangeHandler("8");
        break;
      }
      case 6: {
        // 9
        this.inputChangeHandler("9");
        break;
      }
      case 7: {
        // x
        this.pushToFullHistory("x");
        break;
      }
      case 8: {
        // 4
        this.inputChangeHandler("4");
        break;
      }
      case 9: {
        // 5
        this.inputChangeHandler("5");
        break;
      }
      case 10: {
        // 6
        this.inputChangeHandler("6");
        break;
      }
      case 11: {
        // -
        this.pushToFullHistory("-");
        break;
      }
      case 12: {
        // 1
        this.inputChangeHandler("1");
        break;
      }
      case 13: {
        // 2
        this.inputChangeHandler("2");
        break;
      }
      case 14: {
        // 3
        this.inputChangeHandler("3");
        break;
      }
      case 15: {
        // +
        this.pushToFullHistory("+");
        break;
      }
      case 16: {
        // 0
        this.inputChangeHandler("0");
        break;
      }
      case 17: {
        // .
        this.inputChangeHandler(".");
        break;
      }
      case 18: {
        // =
        this.equalOperator();
        break;
      }
      default: {
        break;
      }
    }
  }

  inputChangeHandler(val) {
    if (!this.state.isOperatorAtEnd) {
      const input = this.state.currentInput;
      if (input === "0") {
        this.setState({
          currentInput: val,
        });
      } else {
        this.setState({
          currentInput: `${input + val}`,
        });
      }
    } else {
      const input = this.state.currentInput;
      if (input === "0") {
        this.setState({
          currentInput: val,
          isOperatorAtEnd: false,
        });
      } else {
        this.setState({
          currentInput: `${val}`,
          isOperatorAtEnd: false,
        });
      }
    }
  }

  clearInput() {
    const input = this.state.currentInput;
    if (input !== 0) {
      this.setState({
        currentInput: "0",
        fullInput: "",
        middleVal: null,
        calcStack: [],
      });
    }
  }

  pushToFullHistory(operator) {
    let input = this.state.currentInput;
    let fullHistory = this.state.fullInput;
    let midVal = this.state.middleVal;
    let stack = this.state.calcStack;
    stack.push(operator);
    fullHistory = fullHistory + " " + input + " " + operator;
    if (midVal !== null) {
      switch (stack.shift().toLowerCase()) {
        case "+": {
          input = midVal + Number(input);
          midVal = input;
          break;
        }
        case "-": {
          input = midVal - Number(input);
          midVal = input;
          break;
        }
        case "x": {
          input = midVal * Number(input);
          midVal = input;
          break;
        }
        case "/": {
          if (Number(input) !== 0) {
            input = midVal / Number(input);
            midVal = input;
          } else {
            input = "Division by zero NAN";
          }
          break;
        }
        default: {
          break;
        }
      }
      this.setState({
        currentInput: typeof input !== "string" ? `${input}` : input,
        fullInput: fullHistory,
        calcStack: stack,
        middleVal: midVal,
        isOperatorAtEnd: true,
      });
    } else {
      midVal = Number(input);
      this.setState({
        currentInput: input,
        fullInput: fullHistory,
        middleVal: midVal,
        calcStack: stack,
        isOperatorAtEnd: true,
      });
    }
  }

  equalOperator() {
    if (!this.state.isOperatorAtEnd && this.state.calcStack.length !== 0) {
      let input = Number(this.state.currentInput);
      let midVal = this.state.middleVal;
      let stack = this.state.calcStack;
      let fullHistory = this.state.fullInput;
      fullHistory = fullHistory + " " + input + " =";

      switch (stack.shift().toLowerCase()) {
        case "+": {
          input = midVal + Number(input);
          midVal = input;
          break;
        }
        case "-": {
          input = midVal - Number(input);
          midVal = input;
          break;
        }
        case "x": {
          input = midVal * Number(input);
          midVal = input;
          break;
        }
        case "/": {
          if (Number(input) !== 0) {
            input = midVal / Number(input);
            midVal = input;
          } else {
            input = "Division by zero NAN";
          }
          break;
        }
        default: {
          break;
        }
      }

      this.setState({
        fullInput: fullHistory,
        calcStack: stack,
        middleVal: midVal,
        currentInput: input,
        isOperatorAtEnd: true,
        isEqualAtEnd: true,
      });
    }
  }

  render() {
    return (
      <div className="box">
        <FormInput
          fullHistory={this.state.fullInput}
          value={this.state.currentInput}
          onChange={this.inputChangeHandler}
        />
        <div className="calc-container">
          <div className="row">
            <CButton value="C" onClick={() => this.handleCalcBtnClick(0)} />
            <CButton value="+/-" onClick={() => this.handleCalcBtnClick(1)} />
            <CButton value="%" onClick={() => this.handleCalcBtnClick(2)} />
            <CButton
              value="/"
              onClick={() => this.handleCalcBtnClick(3)}
              classValue="last"
            />
          </div>
          <div className="row">
            <CButton value="7" onClick={() => this.handleCalcBtnClick(4)} />
            <CButton value="8" onClick={() => this.handleCalcBtnClick(5)} />
            <CButton value="9" onClick={() => this.handleCalcBtnClick(6)} />
            <CButton
              value="x"
              onClick={() => this.handleCalcBtnClick(7)}
              classValue="last"
            />
          </div>
          <div className="row">
            <CButton value="4" onClick={() => this.handleCalcBtnClick(8)} />
            <CButton value="5" onClick={() => this.handleCalcBtnClick(9)} />
            <CButton value="6" onClick={() => this.handleCalcBtnClick(10)} />
            <CButton
              value="-"
              onClick={() => this.handleCalcBtnClick(11)}
              classValue="last"
            />
          </div>
          <div className="row">
            <CButton value="1" onClick={() => this.handleCalcBtnClick(12)} />
            <CButton value="2" onClick={() => this.handleCalcBtnClick(13)} />
            <CButton value="3" onClick={() => this.handleCalcBtnClick(14)} />
            <CButton
              value="+"
              onClick={() => this.handleCalcBtnClick(15)}
              classValue="last"
            />
          </div>
          <div className="row">
            <CButton value="0" onClick={() => this.handleCalcBtnClick(16)} />
            <CButton value="." onClick={() => this.handleCalcBtnClick(17)} />
            <CButton
              value="="
              onClick={() => this.handleCalcBtnClick(18)}
              classValue="last"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
