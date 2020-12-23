import React, { ChangeEvent, FC, ReactElement, useState } from "react";
import Input, { InputProps } from "../Input/Input";


interface DataSourceObject{
    value:string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[];
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}
const AutoComple: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value,renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const result = fetchSuggestions(value);
      // console.log(result)
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const renderTemplate=(item:DataSourceType)=>{
     return renderOption?renderOption(item):item.value
  }
  const renderResult = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="viking-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && renderResult()}
    </div>
  );
};
export default AutoComple;
