import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input, { InputProps } from "./Input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
};
describe("tets input component", () => {
  it("should render the correct default Input", () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testInput=wrapper.getByPlaceholderText('test-input')as HTMLInputElement;
    expect(testInput).toBeInTheDocument()
    expect(testInput).toHaveClass('viking-input-inner')
    fireEvent.change(testInput,{target:{value:'23'}})
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testInput.value).toEqual('23')
  });
  it("should render the disabled Input on disabled property", () => {
    const wrapper = render(<Input disabled placeholder='disabled'/>);
    const testInput=wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testInput.disabled).toBeTruthy()
  });
  it("should render different input sizes on size property", () => {
      const wrapper=render(<Input size='lg'/>)
      const testInput=wrapper.container.querySelector('.viking-input-wrapper')
      expect(testInput).toHaveClass('input-size-lg')

    
  });
  it("should render prepand and append element on prepand/append property", () => {
     const {queryByText,container}=render(<Input prepend="https://" append=".com"/>)
     const testInput=container.querySelector('.viking-input-wrapper')
     expect(testInput).toHaveClass('input-group input-group-append input-group-prepend')
     expect(queryByText('https://')).toBeInTheDocument()
     expect(queryByText('.com')).toBeInTheDocument()

  });
});
