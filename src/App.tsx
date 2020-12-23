import React, { useState } from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/Input";

library.add(fas);
function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="arrow-down" size="2x" theme="primary" />
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
          mode="horizontal"
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem disabled>1</MenuItem>
          <MenuItem>2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
        </Menu>
        <div style={{ width: "600px", height: "100px" }}>
          <Input prepend="https://" append=".com" size="sm" />
        </div>
        <Button
          size="sm"
          onClick={() => {
            setShow(!show);
          }}
          btnType="primary"
        >
          click
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-top">
          <div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <div>111</div>
            <Button>weqweq</Button>
          </div>
        </Transition>
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
