import React from 'react';
import { useState } from 'react'; 
import Login from './Login.jsx';
import Header from '../templete/Header.jsx'
import Footer from '../templete/Footer.jsx';
import styles from'../assets/Main.module.css';
import home from '../assets/Home.module.css'
import GroundList from '../components/ground/GroundList.jsx';

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태 관리

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

    return(
        <div className={styles.main}>
            <Header/>
            <div className={styles.parent}>
                <div className={styles.child1}>
                    <div className={home.introBox}>
                        <img src="character.png" alt="Character" className="character-img" />
                        <h2>세상이 궁금해?</h2>
                        <p>쉽고 재밌는 지식 플랫폼, 뉴닉!</p>
                        <button className={home.startButton} onClick={openModal}>뉴닉 시작하기</button>
                          {/* 모달이 열려 있을 때만 Modal 컴포넌트를 렌더링 */}
                          {isModalOpen && (
                            <Login onClose={closeModal}/>
                          )}
                    </div>
                </div>
                {/* ---------child2 시작 */}
                <div className={styles.child2}>
                  <GroundList />
                </div> 
                {/* ---------child2 끝 */}
                <div className={styles.child3}>
                    
                <div className={home.breakingNews}>
          <h3>1분 뉴스</h3>
          <p>#중동전쟁일발 #노란불들어온 #미국대선초반전</p>
        </div>
        <div className={home.trendingArticles}>
          <h3>지금 인기있는 아티클 🔥</h3>
          <ol>
            <li>화제의 여성 인플루언서 3인, BNK...</li>
            <li>지겹고 재미있는(?) 사회적 상황 이야기</li>
            <li>빼르케 변하는 조직문화 속에서 진정한...</li>
            <li>이번 여름휴가엔 너른하게 사랑 소설을,...</li>
            <li>지속가능한 패션 Sustainable...</li>
          </ol>
        </div>
        <div className={home.recommendedGround}>
          <h3>추천 그라운드 🔔</h3>
          <div className={home.groundItem}>
            <img src="ground-image.jpg" alt="Ground" />
            <h4>마케터의 모든 것 ...</h4>
            <p>오프라인드로 마케팅 관련 다양하고 분병과 터치가 있는 곳입니다. 빼르케 변하는 마케팅...</p>
          </div>
        </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main;