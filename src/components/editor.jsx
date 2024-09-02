import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터 기본 스타일

const Editor = ({ value, onChange }) => {
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
        value={value}
        onChange={onChange}  // 부모로부터 받은 onChange 함수를 사용
        placeholder="내용을 입력하세요..."
        modules={modules}
      />
    </div>
  );
};

export default Editor;
