import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../assets/ProfileEdit.module.css";

const ProfileEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  const [formData, setFormData] = useState({
    user_id: userData?.user_id || "",
    nickname: userData?.nickname || "",
    about: userData?.about || "",
    gender: userData?.gender || "",
    birthyear: userData?.birthyear || "",
    profileImage: null, // 프로필 이미지 추가
  });

  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageClick = () => {
    document.getElementById("profileImageInput").click(); // 파일 입력창 열기
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file)); // 이미지 미리보기 설정
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("인증 토큰이 없습니다. 로그인하세요.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", formData.user_id);
    formDataToSend.append("nickname", formData.nickname);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("birthyear", formData.birthyear);
    if (formData.profileImage) {
      formDataToSend.append("profile", formData.profileImage);
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/profileEdit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Content-Type을 명시하지 않음
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
        navigate(`/${formData.user_id}`);
      } else {
        const errorMessage = await response.text();
        console.error(`서버 에러: ${errorMessage}`);
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <a href={`/${formData.user_id}`} className={styles.backLink}>
        &lt; 프로필로 돌아가기
      </a>
      <h2 className={styles.header}>프로필 편집</h2>
      <div className={styles.profileImage} onClick={handleImageClick}>
        {previewImage ? (
          <img
            src={previewImage}
            alt="미리보기"
            className={styles.profilePreview}
          />
        ) : (
          <div className={styles.cameraIcon}>📷</div>
        )}
      </div>
      <input
        type="file"
        id="profileImageInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>아이디</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            readOnly
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label className={styles.label}>성별</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">성별을 선택해주세요</option>
              <option value="M">남자</option>
              <option value="F">여자</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>출생년도</label>
            <select
              name="birthyear"
              value={formData.birthyear}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">출생년도를 선택해주세요</option>
              {Array.from({ length: 56 }, (_, i) => 1970 + i).map((year) => (
                <option key={year} value={year}>
                  {year} 년
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>소개</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" className={styles.button}>
          완료
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;