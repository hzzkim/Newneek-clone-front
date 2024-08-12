import styles from '../assets/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <h2>NEWNEEK</h2>
          <p>(주)뉴닉</p>
          <p>대표: 김소연 | 사업자 등록번호: 632-81-01159 | 통신판매업 신고번호: 2020-서울마포-2938</p>
          <p>서울특별시 마포구 어울마당로 35, 5층 (04048)</p>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.linkColumn}>
            <h3>뉴닉</h3>
            <ul>
              <li>뉴닉 소개</li>
              <li>뉴스레터 구독</li>
              <li>제휴</li>
              <li>채용</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>소식</h3>
            <ul>
              <li>인스타그램</li>
              <li>X</li>
              <li>네이버 블로그</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>서비스</h3>
            <ul>
              <li>서비스 이용약관</li>
              <li>개인정보처리방침</li>
              <li>고객센터</li>
              <li>앱 다운로드</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;