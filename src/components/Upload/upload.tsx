import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
import Dragger from './dragger';
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  /**添加自定义formdata类型 */
  data?: { [key: string]: any };
  /**是否携带cookie之类 */
  withCredentials?: boolean;
  accept?:string,
  multiple?:boolean,
  /**是否开启拖拽上传文件 */
  drag?:boolean
}
const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onError,
    onProgress,
    beforeUpload,
    onChange,
    onRemove,
    defaultFileList,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  /**
   * 上传过程中更改file列中的状态值
   * @param uploadFile 目标正在上传的文件
   * @param updateObj  当前正在上传文件
   */
  const upDataFileList = (
    uploadFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    console.log(fileList);
    setFileList((preList) => {
      return preList.map((file) => {
        if (file.uid === uploadFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  /**
   * 触发input-file事件
   */
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  /**
   * 文件更改时触发
   * @param e
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  /**
   * 删除当前选中文件
   * @param file 当前需要删除的文件
   */
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  /**
   * 文件上传前触发判断逻辑
   * @param files 当前input的文件列表
   */
  const uploadFiles = (files: FileList) => {
    const postFile = Array.from(files);
    postFile.forEach((file) => {
      if (!beforeUpload) {
        Post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processFile) => {
            Post(processFile);
          });
        } else if (result !== false) {
          Post(file);
        }
      }
    });
  };

  const Post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((preList) => {
      return [_file, ...preList];
    });

    const formData = new FormData();
    formData.append(name||'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            upDataFileList(_file, { percent: percentage, status: "uploading" });
          }

          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        upDataFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        upDataFileList(_file, { status: "error", error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className="viking-upload-component">
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
            {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};
export default Upload;
