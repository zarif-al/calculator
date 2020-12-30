import { evaluate } from "mathjs";
const reducer = (state, action) => {
  if (action.type === "evaluate") {
    const result = evaluate(state.formula);
    return {
      ...state,
      input: result,
      formula: state.formula + "=" + result,
      isEvaluated: true,
    };
  }

  if (action.type === "number") {
    if (state.isEvaluated || state.input === "0") {
      return {
        ...state,
        input: action.payload,
        formula: action.payload,
        isEvaluated: false,
      };
    } else {
      return {
        ...state,
        input: state.input + action.payload,
        formula: state.formula + action.payload,
        isEvaluated: false,
      };
    }
  }

  if (action.type === "AC") {
    return {
      formula: "",
      input: "0",
      isEvaluated: false,
    };
  }

  if (action.type === "decimal") {
    if (state.isEvaluated) {
      return {
        ...state,
        input: "0.",
        formula: "0.",
        isEvaluated: false,
      };
    } else {
      if (!state.input.includes(".")) {
        return {
          ...state,
          input: state.input + ".",
          formula: state.formula + ".",
        };
      } else {
        return {
          ...state,
        };
      }
    }
  }

  if (action.type === "sign_Evaluated") {
    if (state.input === "0") {
      return {
        ...state,
        input: action.payload,
        formula: action.payload,
        isEvaluated: false,
      };
    } else {
      return {
        ...state,
        input: action.payload,
        formula: state.input + action.payload,
        isEvaluated: false,
      };
    }
  }

  if (action.type === "append_slice_0") {
    return {
      ...state,
      input: action.payload,
      formula: state.formula + action.payload,
      isEvaluated: false,
    };
  }

  if (action.type === "append_slice_1") {
    return {
      ...state,
      input: action.payload,
      formula:
        state.formula.slice(0, state.formula.length - 1) + action.payload,
      isEvaluated: false,
    };
  }

  if (action.type === "append_slice_2") {
    return {
      ...state,
      input: action.payload,
      formula:
        state.formula.slice(0, state.formula.length - 2) + action.payload,
      isEvaluated: false,
    };
  }

  throw new Error("No action sent");
};

export default reducer;
