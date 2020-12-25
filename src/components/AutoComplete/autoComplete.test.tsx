import React from "react";
import { config } from "react-transition-group";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  cleanup,
  waitFor,
} from "@testing-library/react";
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];
interface GithubUserProps {
  value: string;
  number: number;
}

const renderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>;
  return (
    <div className="item-value" data-testid="optionid">
      <h5>Name: {itemWithGithub.value}</h5>
      <p>url: {itemWithGithub.number}</p>
    </div>
  );
};
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};
const test1Props: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
  renderOption: renderOption,
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });
  it("should provide keyboard support", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    //arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", async () => {
    cleanup();
    const wrapper1 = render(<AutoComplete {...test1Props} />);
    inputNode = wrapper1.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      
      expect(wrapper1.getAllByTestId("optionid")[0]).toBeInTheDocument();
    });
  });
});
