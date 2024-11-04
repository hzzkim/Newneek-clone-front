import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyProfile() {
  const [loggedInUser, setLoggedInUser] = useState(null);  // 사용자 정보 상태 저장
  const [error, setError] = useState(null);  // 오류 상태 저장
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 토큰을 가져옴
    const token = localStorage.getItem('token');

    if (token) {
      // 토큰이 있을 경우, 백엔드로 사용자 정보 요청
      axios.get('http://localhost:8080/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`  // 토큰을 Authorization 헤더에 포함
        },
      })
      .then(response => {
        setLoggedInUser(response.data);  // 사용자 정보를 상태에 저장
      })
      .catch(error => {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        setError('사용자 정보를 불러오는 데 실패했습니다.');
      });
    } 
  }, [navigate]);

  // 사용자 정보가 로드되지 않았을 때
  if (!loggedInUser && !error) {
    return <div>Loading...</div>;
  }

  // 오류 발생 시
  if (error) {
    return <div>{error}</div>;
  }

  // 사용자 정보가 로드된 경우 프로필 정보를 표시
  return (
    <div className='flex flex-col gap-4'>
      <a href={`/@${loggedInUser.id}`} className='flex gap-2'>
        <img
          src={loggedInUser.profileImage || '/images/default-profile.png'}  // 프로필 이미지가 없을 경우 기본 이미지
          alt="Profile"
          className='rounded-full border-gray-200 bg-gray-200 object-cover object-center size-14'
        />
        <div className='flex flex-col'>
          <strong className='text-sm font-bold text-gray-900'>
            {loggedInUser.nickname || '사용자'}
          </strong>
          <span className='text-xs text-gray-500'>@{loggedInUser.email}</span>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-500'>팔로워</span>
            <span className='h-[10px] w-px bg-gray-300'></span>
            <span className='text-xs text-gray-500'>팔로잉</span>
          </div>
        </div>
      </a> 
      <div className='flex items-center gap-2'>
        <button
          onClick={() => navigate('/article/edit')}
          className='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-basic text-white h-9 px-3 text-sm flex-1'
        >
          새 아티클
        </button>
        <button className='group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors whitespace-nowrap bg-primary-100 text-primary-basic h-9 px-3 text-sm flex-1'>
          새 포스트
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
