import React from 'react';
import Editor from '../components/editor';
import 'react-quill/dist/quill.snow.css';

const ArticleEdit = () => {
  return (
    <div class='size-full h-screen'>
      {/* 헤더부분 */}
      <div
        class='fixed left-0 right-0 top-0 z-50 h-16 w-full bg-white'
        style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderColor: 'rgb(238, 238, 238)' }}
      >
        <div class='mx-auto flex h-full w-full max-w-screen-xl flex-row items-center justify-between px-4'>
          <a href='/'>
            <h1 style={{ cursor: 'pointer' }}>NEWNEEK</h1>
          </a>
          <div class='flex items-center space-x-3'>
            <button
              class='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-100 text-primary-basic h-9 px-3 text-sm'
            >저장하기</button>
            <button
              class='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-basic text-white h-9 px-3 text-sm'
            >발행하기</button>
          </div>
        </div>
      </div>
      <div class='relative mx-auto my-0 flex min-h-screen w-full flex-1 flex-col pb-safe-bottom-0 pt-16'>
        <div class='mx-auto h-full w-full px-4 md:px-0 max-w-screen-sm flex flex-1 flex-col pt-5'>
          <div class='mb-3 md:mb-4'>
            <div class='relative w-[296px]'>
              {/* 시리즈 선택 부분 */}
              <button
                class='mb-3 relative h-9 w-full cursor-pointer rounded-lg bg-white py-2 pl-4 pr-11 text-left text-sm ring-1 ring-inset ring-gray-300 text-gray-400'
              >
                <span
                  class='block truncate'
                >시리즈 선택</span>
                <span
                  class='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'
                >▽</span>
              </button>
              {/* 제목 입력 */}
              <input type="text" 
                placeholder='제목을 입력해 주세요' 
                class='flex resize-none flex-wrap break-words text-xl font-bold text-gray-900 placeholder:text-gray-400'
                style={{border: 'none'}}
              />
              <span class='text-xs font-bold text-gray-500 md:text-sm'>
                0/40
              </span>   
            </div>       
          </div>
          <hr 
            class='mb-5 h-px w-full bg-gray-100'
            style={{border:'none'}}
          />
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
