import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import upload from "./upload";
import Upload from "./upload";

const SimpleUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={action("progress")}
      onSuccess={action("success")}
      onError={action("error")}
    />
  );
};
storiesOf("upload component", module).add("Upload", SimpleUpload);
