import React from 'react';
import Header from '../templete/Header.jsx';
import Footer from '../templete/Footer.jsx';
import styles from '../assets/Signupform.module.css';

const SignupForm = () => {
  return (
    <div>
      <Header/>
      <div className={styles.signupContainer}>
        <h1 className={styles.signformName}>회원가입</h1>
        <p className={styles.signform_p}>매일 새로운 소식과 함께<br />뉴니커의 지식과 경험이 담긴 아티클을 만나보세요.</p>
        
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder="이메일을 입력해 주세요" />
          </div>
        
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호 (8자 이상)</label>
            <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input type="password" id="password-confirm" placeholder="비밀번호를 한 번 더 입력해 주세요" />
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="all-agree" />
            <label htmlFor="all-agree">모두 동의</label>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="age-agree" />
            <label htmlFor="age-agree">만 14세 이상 가입 동의 (필수)</label>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="service-agree" />
            <label htmlFor="service-agree">서비스 이용약관 동의 (필수)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="privacy-agree" />
            <label htmlFor="privacy-agree">개인정보처리방침 동의 (필수)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="marketing-agree" />
            <label htmlFor="marketing-agree">마케팅 정보 수신 동의 (선택)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="marketing-agree" />
            <label htmlFor="marketing-agree">마케팅 정보 수신 동의 (선택)</label>
            <span className={styles.viewTerms}>약관보기</span>
          </div>
          
          <button className={styles.signupButton} type="submit">회원가입</button>
        </form>
      </div>
      <Footer />
    </div>
    
  );
}

export default SignupForm;
