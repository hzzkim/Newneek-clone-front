import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../assets/PasswordRestart.module.css";

const PasswordRestart = () => {
  const [searchParams] = useSearchParams(); // URL에서 토큰 추출
  const token = searchParams.get("token"); // ?token=값 추출

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/passwordRestart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/");
      } else {
        const message = await response.text();
        setError(message);
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비밀번호 재설정</h2>
      <p className={styles.subtitle}>새로운 비밀번호를 입력해 주세요.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default  PasswordRestart;
