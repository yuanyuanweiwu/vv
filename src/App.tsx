import React from "react";
import Button from "./components/Button/button";
import Menu from'./components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={index=>console.log(index)} mode='vertical'>
          <MenuItem  disabled>1</MenuItem>
          <MenuItem >2</MenuItem>
          <SubMenu title='dropdown'>
              <MenuItem>dropdown 1</MenuItem>
              <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
        </Menu>
        
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
