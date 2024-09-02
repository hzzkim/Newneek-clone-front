import React, { useState } from 'react';
import Editor from '../components/editor';
import 'react-quill/dist/quill.snow.css';

const ArticleEdit = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const articleData = {
      seriesId: 1, // 고정값
      userId: '2', // 고정값
      title: title,
      content: content,
      image: '', // 이미지 URL 또는 경로 (필요 시)
      date: new Date().toISOString(), // 현재 시간을 ISO 문자열로 변환
    };

    try {
      const response = await fetch('http://localhost:8080/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        console.log('Article saved successfully');
        // 추가로 처리할 로직 (예: 페이지 이동, 알림 표시 등)
      } else {
        console.error('Failed to save article');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='size-full h-screen'>
      {/* 헤더부분 */}
      <div
        className='fixed left-0 right-0 top-0 z-50 h-16 w-full bg-white'
        style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderColor: 'rgb(238, 238, 238)' }}
      >
        <div className='mx-auto flex h-full w-full max-w-screen-xl flex-row items-center justify-between px-4'>
          <a href='/'>
            <h1 style={{ cursor: 'pointer' }}>NEWNEEK</h1>
          </a>
          <div className='flex items-center space-x-3'>
            <button
              className='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-100 text-primary-basic h-9 px-3 text-sm'
            >저장하기</button>
            <button
              className='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-basic text-white h-9 px-3 text-sm'
              onClick={handleSave} // 발행하기 버튼도 동일한 핸들러를 사용
            >발행하기</button>
          </div>
        </div>
      </div>
      <div className='relative mx-auto my-0 flex min-h-screen w-full flex-1 flex-col pb-safe-bottom-0 pt-16'>
        <div className='mx-auto h-full w-full px-4 md:px-0 max-w-screen-sm flex flex-1 flex-col pt-5'>
          <div className='mb-3 md:mb-4'>
            <div className='relative w-[296px]'>
              {/* 시리즈 선택 부분 */}
              <button
                className='mb-3 relative h-9 w-full cursor-pointer rounded-lg bg-white py-2 pl-4 pr-11 text-left text-sm ring-1 ring-inset ring-gray-300 text-gray-400'
              >
                <span
                  className='block truncate'
                >시리즈 선택</span>
                <span
                  className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'
                >▽</span>
              </button>
              {/* 제목 입력 */}
              <input 
                type="text" 
                placeholder='제목을 입력해 주세요' 
                className='flex resize-none flex-wrap break-words text-xl font-bold text-gray-900 placeholder:text-gray-400'
                style={{border: 'none'}}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className='text-xs font-bold text-gray-500 md:text-sm'>
                0/40
              </span>   
            </div>       
          </div>
          <hr 
            className='mb-5 h-px w-full bg-gray-100'
            style={{border:'none'}}
          />
          <Editor 
            value={content} 
            onChange={setContent} // content 상태를 Editor로 전달
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
