import React, { FC, useState, createContext } from "react";
import classNames from "classnames";
import {MenuItemsProps} from './menuItem'
type MenuMode = "horizontal" | "vertical";
type selectCallback = (selectIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  defaultOpenSubMenus?:string[]
}
interface IMenuContext {
  index: string;
  onSelect?: selectCallback;
  mode?:MenuMode
  defaultOpenSubMenus?:string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect,defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };
   const renderChildren=()=>{
     return React.Children.map(children,(child,index)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemsProps>
       const {displayName}=childElement.type
        if (displayName==='MenuItem' || displayName==='SubMenu') {
          return React.cloneElement(childElement,{index:index.toString()})
        }else{
          console.error('its not a reactchild')
        }
      })
   }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: '0',
  mode: "horizontal",
  defaultOpenSubMenus:[]
};
export default Menu;
