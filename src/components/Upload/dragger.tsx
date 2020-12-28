import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}
const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setdragOver] = useState(false);
  const classes = classNames("viking-uploader-dragger", {
    "is-dragover": dragOver,
  });
  /**
   * 将文件拖拽到指定区域并放手
   * @param e
   */
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setdragOver(false);
    onFile(e.dataTransfer.files);
  };
  /**
   * 拖拽的进入和移出
   * @param e 当前拖拽对象
   * @param over 判断移入移出
   */
  const handleDrag=(e:DragEvent<HTMLElement>,over:boolean)=>{
      e.preventDefault()
      setdragOver(over)
  }
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export default Dragger;
