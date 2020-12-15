import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button size='sm' disabled >nike</Button>
        <Button className='disabled'>adidas</Button>
        <Button btnType='primary' size='lg' onClick={e=>{e.preventDefault();alert('123')}}>click  Large</Button>
        <Button btnType='link' href='www.baidu.com' >www.baidu.com</Button>
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
