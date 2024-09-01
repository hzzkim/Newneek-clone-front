import React from 'react';
import { useState } from 'react'; // useState를 사용하기 위해 추가
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login'; // Modal 컴포넌트를 import
import styles from '../assets/Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태 관리

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>NEWNEEK</h1>
            <nav>
              <ul>
                <li onClick={() => navigate('/')}>홈</li>
                <li onClick={() => navigate('/series')}>시리즈</li>
                <li onClick={() => navigate('/grounds')}>그라운드</li>
                <li onClick={() => navigate('/ImNew')}>아임뉴</li>
              </ul>
            </nav>
          </div>

          <div>
            <button className={styles.loginButton} onClick={openModal}>로그인</button> {/* 로그인 버튼 클릭 시 모달 열림 */}
          </div>
        </div>
      </div>

      {/* 모달이 열려 있을 때만 Modal 컴포넌트를 렌더링 */}
      {isModalOpen && (
        <Login onClose={closeModal}/>
      )}
    </>
  );
}

export default Header;
