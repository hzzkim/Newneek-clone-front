import React, { useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 에디터 기본 스타일
import axios from 'axios'; // 이미지 업로드를 위한 Axios 라이브러리

const Editor = React.memo(() => {
  const [editorContent, setEditorContent] = useState('');
  const quillRef = useRef(null); // Quill 인스턴스 접근용

  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        // 서버에 이미지 업로드 요청
        const response = await axios.post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = response.data; // 서버에서 반환된 이미지 URL
        const quill = quillRef.current.getEditor(); // Quill 인스턴스 가져오기
        const range = quill.getSelection(); // 현재 커서 위치 가져오기

        quill.insertEmbed(range.index, 'image', imageUrl); // 해당 위치에 이미지 삽입
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
  }, []);

  // Quill 에디터의 모듈 (툴바 설정)
  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload, // 이미지 버튼에 대한 핸들러 설정
      }
    },
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}  // Quill 인스턴스 접근용 Ref
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="내용을 입력하세요..."
        modules={modules}  // 이미지 업로드 핸들러가 추가된 모듈
      />
      <div>
        <h3>출력된 내용:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
});

export default Editor;
