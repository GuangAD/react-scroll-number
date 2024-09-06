# react-scroll-number

A react digital scroll up and down animation component

## install

```sh
pnpm add @ggc12319/react-scroll-number
```

## Used in components

```js
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

```

## props

| Attribute         | Description                        | Type   | Default |
| ----------------- | ---------------------------------- | ------ | ------- |
| value             | figure                             | number | -       |
| transformDuration | transform duration                 | number | 1500    |
| fractionDigits    | fraction digits                    | number | 0       |
| prefix            | prefix                             | string | ''      |
| infix             | prefix but after the negative sign | string | ''      |
| suffix            | suffix                             | string | ''      |
| thousandSeparator | the thousand separator             | string | ,       |
