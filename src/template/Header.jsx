import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login"; // 모달 컴포넌트 추가
import styles from "../assets/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 직접 정의
  const [profileImage, setProfileImage] = useState(null); // 직접 정의
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 로그인 상태 체크
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // 로그인 상태 반영
      const userProfile = localStorage.getItem("profileImage");
      if (userProfile) {
        setProfileImage(userProfile); // 프로필 이미지 설정
      }
    }
  }, [setIsLoggedIn, setProfileImage]); // 의존성 추가

  // 로그인 성공 처리
  const handleLoginSuccess = (token, profileImage) => {
    localStorage.setItem("token", token);
    localStorage.setItem("profileImage", profileImage);
    setIsLoggedIn(true); // 로그인 상태 즉시 반영
    setProfileImage(profileImage); // 프로필 이미지 즉시 반영
    setIsModalOpen(false); // 모달 닫기
    navigate("/"); // 홈으로 이동
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    setIsLoggedIn(false);
    setProfileImage(null);
    navigate("/");
  };

  return (
    <>
      {/* 모달 렌더링 */}
      {isModalOpen && (
        <Login onClose={closeModal} onSuccess={handleLoginSuccess} />
      )}

      {/* 헤더 영역 */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">NEWNEEK</Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            홈
          </Link>
          <Link to="/series" className={styles.link}>
            시리즈
          </Link>
          <Link to="/ground" className={styles.link}>
            그라운드
          </Link>
          <Link to="/iamnew" className={styles.link}>
            아엠뉴
          </Link>
          <Link to="/notices" className={styles.link}>
            공지사항
          </Link>
        </nav>
        <div className={styles.actions}>
          <button className={styles.iconBtn}>🔍</button>
          <button className={styles.iconBtn}>🔔</button>
          {isLoggedIn ? (
            <div className={styles.profileContainer}>
              <img
                src={
                  profileImage?.startsWith("http")
                    ? profileImage
                    : `http://localhost:8080/uploads/${profileImage}`
                }
                alt="프로필"
                className={styles.profileImage}
              />
              <button onClick={handleLogout} className={styles.logoutBtn}>
                로그아웃
              </button>
            </div>
          ) : (
            <button onClick={openModal} className={styles.loginBtn}>
              로그인
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
