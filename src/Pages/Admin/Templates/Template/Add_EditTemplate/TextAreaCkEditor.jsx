import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ProjectList from "./../../../Requests/Index";

function TextAreaCkEditor({ form, name, defaultData }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      // data="<ul><li>Unique Features</li></ul>"
      data={defaultData}
      config={{
        toolbar: ["bulletedList"],
      }}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();

        form.setFields([
          {
            name: name,
            value: data,
          },
        ]);
      }}
      onBlur={(event, editor) => {
        // console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        // console.log("Focus." , editor);
      }}
    />
  );
}

export default TextAreaCkEditor;
