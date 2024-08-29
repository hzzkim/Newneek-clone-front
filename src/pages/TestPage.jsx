import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Quill 에디터 스타일 임포트

const TestPage = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div>
      <h1 style={{ marginTop: '20px'}}>Test Page</h1>
      
      <div style={{ marginTop: '20px', width: '500px', height:'500px' }}>
        <h2>Quill Editor</h2>
        <ReactQuill 
          value={editorContent}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default TestPage;
