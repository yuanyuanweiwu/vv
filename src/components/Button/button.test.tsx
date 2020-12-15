import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};
const disabledProps:ButtonProps={
    disabled:true
}
describe("test button component", () => {
  it("should render the corrrect default button", () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the corrrect component base on different props", () => {
    const wrapper = render(<Button {...testProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  });
  it("should render a link when btnType equals link and href is provided", () => {
      const wrapper=render(<Button btnType='link' href='www.baidu.com'>LINK</Button>)
      const element = wrapper.getByText("LINK") as HTMLButtonElement;
      expect(element).toBeInTheDocument();
      expect(element.tagName).toEqual("A");
      expect(element).toHaveClass('btn btn-link')

  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  });
});
