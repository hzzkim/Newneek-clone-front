import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터 기본 스타일

const Editor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="내용을 입력하세요..."
        modules={modules}
      />
      <div>
        <h3>출력된 내용:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

export default Editor;
