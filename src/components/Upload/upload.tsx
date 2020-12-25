import React, { ChangeEvent, FC, useRef } from "react";
import axios from "axios";
import Button from "../Button/button";

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}
const Upload: FC<UploadProps> = (props) => {
  const { action, onSuccess, onError, onProgress } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange=(e:ChangeEvent<HTMLInputElement>)=>{
      const files=e.target.files
      if(!files){
          return
      }
      uploadFiles(files)
      if(fileInput.current){
          console.log(fileInput)
          fileInput.current.value=''
      }
  }
  const uploadFiles=(files:FileList)=>{
    const postFile=Array.from(files)
    postFile.forEach(file=>{
        const formData=new FormData()
        formData.append(file.name,file)
        axios.post(action,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'   
            },
            onUploadProgress:e=>{
                let percentage =Math.round((e.loaded * 100)/ e.total)|| 0;
                if (percentage<100) {
                    if (onProgress) {
                        onProgress(percentage,file)
                    }
                }
            }
        }).then(res=>{
            console.log(res)
            if (onSuccess) {
                onSuccess(res.data,file)
            }
        }).catch(err=>{
            if (onError) {
                onError(err,file)
            }
        })

    })
  }
  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick}>UPLOAD FILE</Button>
      <input
        className="viking-file-input"
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};
export default Upload;
