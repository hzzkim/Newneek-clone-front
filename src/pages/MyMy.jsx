import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../assets/MyMy.module.css";

function MyPage() {
  const { user_id } = useParams(); // URL에서 user_id 가져오기
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보를 백엔드에서 가져오는 함수
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/auth/${user_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data); // 사용자 데이터 설정
        } else {
          console.error("사용자 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user_id]);

  if (!userData) return <p>Loading...</p>; // 데이터가 로드될 때까지 로딩 표시

  const handleEditClick = () => {
    console.log("전달할 사용자 데이터:", userData); // 로그로 확인
    navigate("/profile_edit", { state: { userData } }); // ProfileEdit으로 데이터 전달
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileImage}></div>
      <h2 className={styles.username}>{userData.username}</h2>
      <p className={styles.nickname}>@{userData.nickname}</p>
      <div className={styles.stats}>
        <span>팔로워 {userData.followers}</span>
        <span>|</span>
        <span>팔로잉 {userData.following}</span>
      </div>
      <div className={styles.about}>{userData.about}</div>
      <button onClick={handleEditClick} className={styles.editButton}>
        프로필 편집
      </button>

      <div className={styles.tabs}>
        <span className={`${styles.tab} ${styles.active}`}>아티클</span>
        <span className={styles.tab}>포스트</span>
        <span className={styles.tab}>시리즈</span>
      </div>

      <div className={styles.articleContainer}>
        <div className={styles.emoji}>
          <span role="img" aria-label="hedgehog">
            🦔
          </span>
        </div>
        <p className={styles.noArticlesText}>새로운 아티클이 없어요</p>
        <button className={styles.newArticleButton}>새 아티클 쓰기</button>
      </div>
    </div>
  );
}

export default MyPage;
