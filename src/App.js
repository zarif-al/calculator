import "./App.css";
import buttonValues from "./calculator_buttons";
import { useReducer } from "react";
import reducer from "./reducer";
function App() {
  const defaultState = {
    formula: "",
    input: "0",
    isEvaluated: false,
  };
  const [state, dispatch] = useReducer(reducer, defaultState);

  const checkSign = (value) => {
    if (value === "+" || value === "-" || value === "/" || value === "*") {
      return true;
    }
  };

  const signCount = () => {
    if (
      checkSign(state.formula[state.formula.length - 1]) &&
      checkSign(state.formula[state.formula.length - 2])
    ) {
      return 2;
    } else if (
      checkSign(state.formula[state.formula.length - 1]) &&
      !checkSign(state.formula[state.formula.length - 2])
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  const signBtn = (sign) => {
    if ((state.formula.length === 0 && sign === "-") || state.isEvaluated) {
      dispatch({ type: "sign_Evaluated", payload: sign });
    } else {
      if (signCount() !== 2) {
        if (sign === "-" || signCount() === 0) {
          dispatch({ type: "append_slice_0", payload: sign });
        } else if (signCount() === 1) {
          dispatch({ type: "append_slice_1", payload: sign });
        }
      } else {
        dispatch({ type: "append_slice_2", payload: sign });
      }
    }
  };

  return (
    <div className="calculator-body">
      <div className="formulaScreen row">{state.formula}</div>
      <div className="outputScreen row" id="display">
        {state.input}
      </div>
      <div className="buttons">
        {buttonValues.map((button) => {
          if (checkSign(button.value)) {
            return (
              <button
                className={button.class}
                value={button.value}
                id={button.id}
                onClick={() => {
                  signBtn(button.value);
                }}
              >
                {button.show}
              </button>
            );
          } else if (button.value === "AC") {
            return (
              <button
                className={button.class}
                value={button.value}
                id={button.id}
                onClick={() => {
                  dispatch({ type: "AC" });
                }}
              >
                {button.show}
              </button>
            );
          } else if (button.value === "=") {
            return (
              <button
                className={button.class}
                value={button.value}
                id={button.id}
                onClick={() => {
                  dispatch({ type: "evaluate" });
                }}
              >
                {button.show}
              </button>
            );
          } else if (button.value === ".") {
            return (
              <button
                className={button.class}
                value={button.value}
                id={button.id}
                onClick={() => {
                  dispatch({ type: "decimal" });
                }}
              >
                {button.show}
              </button>
            );
          } else {
            return (
              <button
                className={button.class}
                value={button.value}
                id={button.id}
                onClick={() => {
                  dispatch({ type: "number", payload: button.value });
                }}
              >
                {button.show}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
