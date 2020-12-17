import React from "react";
import { act, fireEvent, render ,RenderResult,cleanup} from "@testing-library/react";


import Menu,{MenuProps} from './menu';
import MenuItem from './menuItem'
const testProps:MenuProps={
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test'
}
const testVerticalProps:MenuProps={
    defaultIndex:0,
    mode:'vertical'
}

const generateMenu=(props: MenuProps) =>{
    return (
        <Menu {...props}>
          <MenuItem >
            active
          </MenuItem>
          <MenuItem disabled >
            disabled
          </MenuItem>
          <MenuItem >
            xyz
          </MenuItem>
        </Menu>
      )
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe("test menu and menuitem", () => {
    beforeEach(()=>{
        wrapper=render(generateMenu(testProps))
        menuElement=wrapper.getByTestId('test-menu')
        activeElement=wrapper.getByText('active')
        disabledElement=wrapper.getByText('disabled')
       
    })
  it("should render correct Menu and MenuItem based on default props", () => {
      expect(menuElement).toBeInTheDocument()
      expect(menuElement).toHaveClass('menu test')
      expect(menuElement.getElementsByTagName('li').length).toEqual(3)
      expect(activeElement).toHaveClass('menu-item is-active')
      expect(disabledElement).toHaveClass('menu-item is-disabled')

  });
  it("click items should change active and call the right callback", () => {
       let thirdItem=wrapper.getByText('xyz')
       fireEvent.click(thirdItem)
       expect(thirdItem).toHaveClass('is-active')
       expect(activeElement).not.toHaveClass('is-active')
       expect(testProps.onSelect).toHaveBeenCalledWith(2)
       fireEvent.click(disabledElement)
       expect(disabledElement).not.toHaveClass('is-active')
       expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  });
  it("should show dropdown items when hover on subMenu",  () => {
    cleanup()
    const wrapper=render(generateMenu(testVerticalProps))
    const menuElement=wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  });
});
