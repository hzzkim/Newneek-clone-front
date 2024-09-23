import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const Editor = () => {
  const [value, setValue] = useState(''); // 에디터의 내용 관리
  const quillRef = useRef(null); // Quill 인스턴스에 접근하는 useRef

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      console.log("선택된 파일: ", file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log("파일 업로드 요청 전송 중...");
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("파일 업로드 응답 수신: ", response.data);

        const imageUrl = response.data;  // 서버에서 반환된 이미지 URL
        const quill = quillRef.current.getEditor(); // Quill 인스턴스 가져오기
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
        console.log("에디터에 이미지 삽입 완료: ", imageUrl);
      } catch (error) {
        console.error('이미지 업로드 실패: ', error);
      }
    };
  };

  const handleSave = async () => {
    try {
      console.log("내용 저장 요청 전송 중...");
      const response = await axios.post('/saveContent', { content: value });
      console.log("내용 저장 응답 수신: ", response.data);
      alert('내용이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('내용 저장 실패: ', error);
      alert('내용 저장에 실패했습니다.');
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        'image': handleImageUpload,  // 이미지 버튼에 대한 핸들러
      },
    },
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={setValue}  // 에디터 내용 변경 시 상태 업데이트
        placeholder="내용을 입력하세요..."
        modules={modules}
        ref={quillRef}  // Quill 인스턴스에 접근하기 위한 참조
      />
      <button onClick={handleSave}>저장</button>  {/* 저장 버튼 추가 */}
    </div>
  );
};

export default Editor;
