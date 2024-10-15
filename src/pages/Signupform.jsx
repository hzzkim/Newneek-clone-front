import React, { useState } from 'react';
import axios from 'axios'; // Axios 임포트
import Header from '../template/Header.jsx';
import Footer from '../template/Footer.jsx';
import styles from '../assets/Signupform.module.css';

const SignupForm = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
    passwordConfirm: '',
    allAgree: false,
    ageAgree: false,
    serviceAgree: false,
    privacyAgree: false,
    marketingAgree: false,
  });

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'allAgree') {
      // 모두 동의가 선택되면 나머지 필수 항목도 true로 설정
      setFormData({
        ...formData,
        allAgree: checked,
        ageAgree: checked,
        serviceAgree: checked,
        privacyAgree: checked,
        marketingAgree: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };
  

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 비밀번호 확인 로직 추가
    if (formData.pw !== formData.passwordConfirm) {
      console.error('비밀번호가 일치하지 않습니다.');
      return;  // 비밀번호가 일치하지 않으면 폼 제출 중단
    }
  
    // 마케팅 정보 수신 동의가 선택사항일 경우 제외
    const { marketingAgree, ...filteredFormData } = formData;
  
    // 서버로 데이터 전송
    try {
      const response = await axios.post('http://localhost:8080/api/auth/Signupform', filteredFormData);
  
      if (response.status === 200) {
        console.log('회원가입 성공:', response.data);
        // 성공 처리 로직 (예: 홈으로 리다이렉트 또는 알림 표시)
      } else {
        console.error('회원가입 실패:', response.status, response.data);
      }
    } catch (error) {
      console.error('서버 에러:', error);
    }
  };
  
  

  return (
    <div>
      <Header />
      <div className={styles.signupContainer}>
        <h1 className={styles.signformName}>회원가입</h1>
        <p className={styles.signform_p}>
          매일 새로운 소식과 함께
          <br />
          뉴니커의 지식과 경험이 담긴 아티클을 만나보세요.
        </p>

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
            <label htmlFor="password">비밀번호 (8자 이상)</label>
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

          <div className={styles.formGroup}>
            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              name="passwordConfirm"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="all-agree"
              name="allAgree"
              checked={formData.allAgree}
              onChange={handleChange}
            />
            <label htmlFor="all-agree">모두 동의</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="age-agree"
              name="ageAgree"
              checked={formData.ageAgree}
              onChange={handleChange}
              required
            />
            <label htmlFor="age-agree">만 14세 이상 가입 동의 (필수)</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="service-agree"
              name="serviceAgree"
              checked={formData.serviceAgree}
              onChange={handleChange}
              required
            />
            <label htmlFor="service-agree">서비스 이용약관 동의 (필수)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="privacy-agree"
              name="privacyAgree"
              checked={formData.privacyAgree}
              onChange={handleChange}
              required
            />
            <label htmlFor="privacy-agree">개인정보처리방침 동의 (필수)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="marketing-agree"
              name="marketingAgree"
              checked={formData.marketingAgree}
              onChange={handleChange}
            />
            <label htmlFor="marketing-agree">마케팅 정보 수신 동의 (선택)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>

          <button className={styles.signupButton} type="submit">
            회원가입
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
