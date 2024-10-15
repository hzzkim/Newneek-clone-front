import React, { useState } from 'react';
import styles from '../assets/Login.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onClose }) {
  const navigate = useNavigate();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    pw: ''
  });

  // 이메일 로그인 상태 관리
  const [showEmailLogin, setShowEmailLogin] = useState(false);  // 이메일 로그인 폼 표시 여부

  // 에러 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState('');

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 백엔드와 연결해서 로그인 처리
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);

        // 팝업 닫기
        onClose();
        
        // 로그인 성공 시 시리즈 페이지로 리디렉트
        navigate('/series');
      } else {
        console.error('로그인 실패:', response.status, response.data);
        setErrorMessage('로그인 실패: 이메일 또는 비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error('서버 에러:', error);
      
      // 서버 에러 또는 비밀번호 오류 처리
      if (error.response && error.response.status === 401) {
        setErrorMessage('잘못된 비밀번호입니다.');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('등록되지 않은 이메일입니다.');
      } else {
        setErrorMessage('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  const handleSignupClick = () => {
    onClose();
    navigate('/Signupform');
  }

  // 이메일 로그인 버튼 클릭 시
  const handleEmailLoginClick = () => {
    setShowEmailLogin(true);  // 이메일 로그인 폼을 표시하고 다른 버튼들은 숨김
  };

  // 구글 로그인 처리 (추가할 기능)
  const handleGoogleLogin = () => {
    // Google 로그인 API 호출 등의 로직 추가
    console.log('Google 로그인 버튼 클릭');
    // 로그인 성공 시 시리즈 페이지로 리디렉트
    navigate('/series');
  };

  // 애플 로그인 처리 (추가할 기능)
  const handleAppleLogin = () => {
    // Apple 로그인 API 호출 등의 로직 추가
    console.log('Apple 로그인 버튼 클릭');
    // 로그인 성공 시 시리즈 페이지로 리디렉트
    navigate('/series');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalControl}>
          <button className={styles.modalClose} onClick={onClose}>X</button>
          <h1>NEWNEEK</h1>
          <p>매일 새로운 소식과 함께<br />뉴니커의 지식과 경험이 담긴 아티클을 만나보세요.</p>
        </div>

        <div className={styles.modalContent}>
          {!showEmailLogin && (
            <>
              <button className={styles.button} onClick={handleGoogleLogin}>Google 로그인</button>
              <button className={styles.button} onClick={handleAppleLogin}>Apple 로그인</button>
              {/* 이메일 로그인 버튼 클릭 시 폼 표시 */}
              <button className={styles.button} onClick={handleEmailLoginClick}>이메일 로그인</button>
            </>
          )}

          {showEmailLogin && (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일을 입력해 주세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="pw"
                  placeholder="비밀번호를 입력해 주세요"
                  value={formData.pw}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 에러 메시지 표시 */}
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

              <button type="submit" className={styles.button}>로그인</button>
            </form>
          )}
        </div>

        <a onClick= {handleSignupClick} style={{ cursor: 'pointer' }}>회원가입</a>
        <a onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>비밀번호 찾기</a>
      </div>
    </div>
  );
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,  // 팝업을 닫는 함수
};

export default Login;