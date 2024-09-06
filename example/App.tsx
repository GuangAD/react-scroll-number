import { useState } from "react";
import "./App.css";
import ScrollNumber from "../src/index";
function App() {
  const [count, setCount] = useState(4.4);
  const addCount = () => {
    setCount(count + 1.7);
  };

  const subtractCount = () => {
    setCount(count - 1.7);
  };
  return (
    <div className="card">
      <div>
        <ScrollNumber value={count} fractionDigits={1} />
      </div>
      <button onClick={addCount}>count is {count}</button>
      <button onClick={subtractCount}>count is {count}</button>
    </div>
  );
}

export default App;
