import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../assets/Attendance.module.css";
import Calendar from "../components/Canlendar.jsx";
import AttendanceReport from "../components/AttendanceReport.jsx";

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // 로그인 상태에서 토큰을 localStorage에 저장
  const login = (user) => {
    localStorage.setItem('token', user.token);
  };

  // 로그인된 사용자 ID 가져오기
  const getCurrentUserId = async () => {
    const token = localStorage.getItem('token'); // localStorage에서 JWT 토큰 요청
    if (!token) {
      setMessage("로그인 상태가 아닙니다.");
      return null;
    }

    try {
      console.log("Sending token:", token); // 전송되는 token 확인
      // Authorization 헤더에 토큰을 포함하여 서버로 요청
      const response = await axios.get('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
        }
      });
      console.log("Fetched User Data:", response.data); // 받아온 사용자 데이터 출력
      return response.data; // 서버에서 반환된 사용자 정보
    } catch (error) {
      console.error('Error fetching user ID:', error);
      setMessage("사용자 정보를 가져오는 데 실패했습니다.");
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getCurrentUserId(); // 사용자 데이터를 가져옴
      setUser(fetchedUser); // 상태에 저장
    };

    fetchUser();
  }, []);

  // 출석 체크를 처리하는 함수
  const handleAttendanceCheck = async () => {
    const user = await getCurrentUserId();
    console.log("User from getCurrentUserId:", user); // 사용자 정보 전체 출력
  
    if (!user || !user.userId) {
      alert("사용자 ID가 없으므로 출석 체크를 할 수 없습니다.");
      return;
    }
  
    const { userId } = user; // 사용자 id만 추출
    console.log("Sending userId:", userId); // 전송된 userId값 출력
  
    try {
      const response = await axios.post("/api/attendance/check", {
        userId: userId, // 로그인된 사용자 ID
        date: date.toISOString().split("T")[0], // YYYY-MM-DD 형식
      });
  
      alert(response.data); // 성공 메시지
      window.location.reload(); // 출석 체크 성공 후 새로고침
    } catch (error) {
      alert(error.response?.data || "출석 체크 중 오류가 발생했습니다."); // 오류 메시지
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>출석 체크</h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '10px',
        alignItems: 'center',
        height: '60vh',
        margin: '0',
      }}>
        <Calendar />
      </div>

      <div className={styles.buttonSection}>
        <button className={styles.orangeButton} onClick={handleAttendanceCheck}>
          출석 체크 하기
        </button>
      </div>

      {/* 사용자 정보가 존재할 경우에만 AttendanceReport 렌더링 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
        marginBottom: '20px',
      }}>
        {user && <AttendanceReport userId={user.userId} year={2025} />}
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Attendance;
