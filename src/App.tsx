import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>nike</Button>
        <Button className='disabled'>adidas</Button>
        <Button type={ButtonType.Default} size={ButtonSize.Large}>click</Button>
        <Button type={ButtonType.Link} href='www.baidu.com' >www.baidu.com</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
