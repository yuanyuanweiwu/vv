import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import upload from "./upload";
import Upload from "./upload";
import Icon from "../Icon/icon";
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50000) {
    alert("file is too big");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.jpg", { type: file.type });
  return Promise.resolve(newFile);
};
const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      // onProgress={action("progress")}
      // onSuccess={action("success")}
      // onError={action("error")}
      onChange={action("changed")}
      beforeUpload={filePromise}
      name="filename"
      data={{ key: "value" }}
      headers={{ v: "sh" }}
      accept=".jpg"
      multiple={true}
      drag={true}
      // beforeUpload={checkFileSize}
    >
      {" "}
      <Icon icon="upload" size="2x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};
storiesOf("upload component", module).add("Upload", SimpleUpload);
