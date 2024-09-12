import React from 'react';
import styles from'../assets/Login.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Login({ onClose}) {
  const navigate = useNavigate();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalControl}>
          <button className={styles.modalClose} onClick={onClose}>X</button>
          <h1>NEWNEEK</h1>
          <p>매일 새로운 소식과 함께<br />뉴니커의 지식과 경험이 담긴 아티클을 만나보세요.</p>
        </div>
        <div className={styles.modalContent}>
          <button className={styles.button}>Google 로그인</button>
          <button className={styles.button}>Apple 로그인</button>
          <button className={styles.button}>이메일 로그인</button>
        </div>
        {/* <a href="/Sign">회원가입</a> */}
        <a onClick={() => navigate('/Signupform')} style={{ cursor: 'pointer' }}>회원가입 </a>
        비밀번호 찾기
      </div>
    </div>
  );
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,  // onClose는 함수 타입이고 필수 prop입니다.
  user: PropTypes.shape({
    profile: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,  // user도 필수 prop입니다.
};
export default Login;