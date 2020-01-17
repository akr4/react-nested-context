import React, {
  Dispatch,
  Reducer,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";
import "./App.css";

type CounterAction = { type: "increment" };

const CounterContext1 = React.createContext({
  state: 0,
  dispatch: (() => {}) as Dispatch<CounterAction>
});
const CounterContext2 = React.createContext({
  state: 0,
  dispatch: (() => {}) as Dispatch<CounterAction>
});

const counterReducer: Reducer<number, CounterAction> = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    default:
      return state;
  }
};

const Counter1: React.FC = React.memo(() => {
  console.log("Counter1");
  const { state, dispatch } = useContext(CounterContext1);
  const increment = useCallback(() => dispatch({ type: "increment" }), [
    dispatch
  ]);
  return (
    <div className="counter">
      <h1>Counter 1</h1>
      <div className="value">{state}</div>
      <button className="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
});

const Counter2: React.FC = React.memo(() => {
  console.log("Counter2");
  const { state, dispatch } = useContext(CounterContext2);
  const increment = useCallback(() => dispatch({ type: "increment" }), [
    dispatch
  ]);
  return (
    <div className="counter">
      <h1>Counter 2</h1>
      <div className="value">{state}</div>
      <button className="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
});

const App: React.FC = () => {
  const [counter1, counterDispatch1] = useReducer(counterReducer, 0);
  const [counter2, counterDispatch2] = useReducer(counterReducer, 0);

  const contextValue1 = useMemo(() => {
    return {
      state: counter1,
      dispatch: counterDispatch1
    };
  }, [counter1]);

  const contextValue2 = useMemo(() => {
    return {
      state: counter2,
      dispatch: counterDispatch2
    };
  }, [counter2]);

  return (
    <CounterContext1.Provider value={contextValue1}>
      <CounterContext2.Provider value={contextValue2}>
        <div className="App">
          <Counter1 />
          <Counter2 />
        </div>
      </CounterContext2.Provider>
    </CounterContext1.Provider>
  );
};

export default App;
