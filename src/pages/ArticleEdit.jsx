import React, { useState } from 'react';
import Editor from '../components/editor';
import AddSeries from '../components/series/AddSeries';
import 'react-quill/dist/quill.snow.css';

const ArticleEdit = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const [isAddSeriesOpen, setIsAddSeriesOpen] = useState(false); // 시리즈 추가 상태 관리

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

  // 시리즈 선택 버튼을 클릭하면 드롭다운 열림 상태를 토글하는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 시리즈 추가 버튼을 클릭하면 AddSeries 컴포넌트가 열림
  const toggleAddSeries = () => {
    setIsAddSeriesOpen((prev) => !prev);
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
              onClick={handleSave}
            >발행하기</button>
          </div>
        </div>
      </div>
      <div className='relative mx-auto my-0 flex min-h-screen w-full flex-1 flex-col pb-safe-bottom-0 pt-16'>
        <div className='mx-auto h-full w-full px-4 md:px-0 max-w-screen-sm flex flex-1 flex-col pt-5'>
          <div className='mb-3 md:mb-4'>
            <div className='relative w-[296px]'>
              {/* 시리즈 선택 버튼 */}
              <button
                className='mb-3 relative h-9 w-full cursor-pointer rounded-lg bg-white py-2 pl-4 pr-11 text-left text-sm ring-1 ring-inset ring-gray-300 text-gray-400'
                onClick={toggleDropdown} // 버튼 클릭 시 드롭다운 토글
              >
                <span className='block truncate'>시리즈 선택</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>▽</span>
              </button>
              {/* 드롭다운이 열려 있을 때만 표시 */}
              {isDropdownOpen && (
                <div id="series-listbox" aria-labelledby="series-listbox-label" aria-orientation="vertical"
                className ='absolute z-50 max-h-60 w-[296px] min-w-fit overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5'
                >
                  <div className='flex items-center justify-between px-4 pb-2 pt-3'>
                    <strong className='text-sm font-bold text-gray-900'>시리즈 선택</strong>
                    <div className='text-sm font-bold text-gray-900'>
                      <button className='text-xs font-bold text-gray-500'>편집</button>
                    </div>
                  </div>
                  <div className='px-4 py-3'>
                    {/* 시리즈 추가 버튼 */}
                    <button className='flex items-center gap-2 text-sm font-bold text-gray-700' onClick={toggleAddSeries}>
                      시리즈 추가
                    </button>
                  </div>
                  <div className='flex py-2 center'>
                    <div className='flex flex-1 flex-col gap-4 p-12 text-center center mb-4 h-[100px] break-keep'>
                      <p>새로운 시리즈가 없어요</p>
                    </div>
                  </div>
                </div>
              )}
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
          <hr className='mb-5 h-px w-full bg-gray-100' style={{border:'none'}} />
          <Editor value={content} onChange={setContent} />

          {/* 시리즈 추가 버튼을 클릭했을 때 AddSeries 출력 */}
          {isAddSeriesOpen && <AddSeries onClose={toggleAddSeries} />}
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
