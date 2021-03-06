import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "./../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from './../../hooks/useClickOutside';
import Transition from "../Transition/transition";
import { loadavg } from "os";
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**用于异步查询*/
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * 下拉列表选择
   */
  onSelect?: (item: DataSourceType) => void;
  /**自定义渲染 */
  renderOption?: (item: DataSourceType) => ReactElement;
}
const AutoComple: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [Loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighLightIndex] = useState(-1);
  const triggerSearch=useRef(false)
  const debounceValue = useDebounce(inputValue, 500);
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef,()=>{setSuggestions([])})
  useEffect(() => {
    if (inputValue &&triggerSearch.current) {
      //判断是否是异步查询
      const result = fetchSuggestions(debounceValue);
      // console.log(result)
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setSuggestions(data);
          setLoading(false);
          if (data.length>0) {
            setShowDropdown(true)
          }
        });
      } else {
        //同步只需要修改state
        setSuggestions(result);
        setShowDropdown(true)
      }
    } else {
      //如果输入值为空清空列表
      setSuggestions([]);
      setShowDropdown(false)
    }
    //消除键盘上下键更改的index
    setHighLightIndex(-1)
  }, [debounceValue]);
 
  //用于高亮选中项
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLightIndex(index);
  };
  //键盘按键事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  //input的value改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current=true
  };
   //从列表中选中项
   const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current=false
  };
  //用于判断是否是自定义渲染
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
      in={showDropdown || Loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={() => {setSuggestions([])}}
    >
      <ul className="viking-suggestion-list">
      { Loading &&
        <div className="suggstions-loading-icon">
          <Icon icon="spinner" spin/>
        </div>
      }
      {suggestions.map((item, index) => {
        const cnames = classNames('suggestion-item', {
          'is-active': index === highlightIndex
        })
        return (
          <li key={index} className={cnames} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        )
      })}
    </ul>
    </Transition>
    )
  }
 

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      />
      {generateDropdown()}
    </div>
  );
};
export default AutoComple;
