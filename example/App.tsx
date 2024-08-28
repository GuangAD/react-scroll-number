import { useState } from "react";
import "./App.css";
import ScrollNumber from "../src/index";
function App() {
  const [count, setCount] = useState(4);
  const addCount = () => {
    setCount(count + 1);
  };

  const subtractCount = () => {
    setCount(count - 1);
  };
  return (
    <div className="card">
      <div>
        <ScrollNumber value={count} />
      </div>
      <button onClick={addCount}>count is {count}</button>
      <button onClick={subtractCount}>count is {count}</button>
    </div>
  );
}

export default App;
