import React, { useState } from 'react';
import styles from '../assets/PasswordReset.module.css';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('비밀번호 재설정 링크를 이메일로 전송했습니다.');
        setError('');
      } else {
        const result = await response.text();
        setError(result || '링크 전송에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      <p className={styles.description}>
        비밀번호를 재설정할 수 있는 링크를 보내드려요.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.submitButton}>링크 전송</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <p className={styles.footerText}>
        이메일 주소가 떠오르지 않나요? <span className={styles.signupLink} onClick={() => navigate('/Signupform')}>새로 가입하기</span>
      </p>
    </div>
  );
};

export default PasswordReset;
