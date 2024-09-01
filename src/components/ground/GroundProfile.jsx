import React from 'react';
import ground from '../../ground';

function GroundProfile({id}) {
  const selectedGround = ground.find((item) => item.id === parseInt(id));

  return (
    <div className='flex flex-col'>
      <img src={selectedGround.img} alt={selectedGround.title} className='mb-4 size-[88px] rounded-lg border border-gray-100 bg-gray-200 object-cover object-center' />
      <h1 className='mb-2 flex flex-col text-xl font-bold text-gray-900'>
        <span className='mb-0.5 inline text-xs font-bold text-gray-500'>
          그라운드
        </span>
        {selectedGround.title}
      </h1>
      <p className='line-clamp-3 break-all text-sm text-gray-600'>{selectedGround.content}</p>

      <div className='mb-2 mt-2 md:mb-3'>
        <button 
          className='rounded text-gray-500 font-bold h-8 pl-2 pr-1 text-sm'
        >
          소개 더 보기 >
        </button>
      </div>

      <span className='text-xs font-bold text-gray-450'>
        👤 멤버 {selectedGround.member}명
        <span className='tag'>{selectedGround.category}</span>
      </span>
      <button 
        className='rounded-lg font-bold whitespace-nowrap bg-primary-basic text-white hover:bg-primary-hover h-9 px-3 text-sm'
      >
        그라운드 참여하기
      </button>
    </div>
  );
}

export default GroundProfile;
