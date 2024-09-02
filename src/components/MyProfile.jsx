import React from 'react';
import users from '../user';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  const navigate = useNavigate(); 

  const handleNewArticleClick = () => {
    navigate('/article/edit');
  };

  return (
    <div class='flex flex-col gap-4'>
      {/* 클릭 시 회원 프로필 페이지로 이동하게 href 걸어야함 */}
      <a href="/@{loggedInUserId}" class='flex gap-2'>
        <img src={loggedInUser.profile} alt="lo" class='rounded-full border-gray-200 bg-gray-200 object-cover object-center size-14'/>
        <div class='flex flex-col'>
          <strong class='text-sm font-bold text-gray-900'>{loggedInUser.name}</strong>
          <span class='text-xs text-gray-500'>@{loggedInUser.id}</span>
          <div class='flex items-center gap-2'>
            <span class='text-xs text-gray-500'>팔로워</span>
            <span class='h-[10px] w-px bg-gray-300'></span>
            <span class='text-xs text-gray-500'>팔로잉</span>
          </div>
        </div>
      </a>
      <div class='flex items-center gap-2'>
        <a
          onClick={handleNewArticleClick} 
          class='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-basic text-white h-9 px-3 text-sm flex-1'
        >
          새 아티클
        </a>
        <a class='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-100 text-primary-basic h-9 px-3 text-sm flex-1'>
          새 포스트
        </a>
      </div>
    </div>
  );
}

export default MyProfile;
