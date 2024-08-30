// TestPage.jsx
import React from 'react';
import Editor from '../components/editor';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터의 기본 스타일

const TestPage = () => {
  return (
    <div className="test-page">
      <h1 style={{ marginTop: "100px" }}>React Quill 에디터 테스트</h1>
      <Editor />
    </div>
  );
};

export default TestPage;
