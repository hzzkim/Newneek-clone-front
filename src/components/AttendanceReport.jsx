import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Value } from "sass";

// 필요한 Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceReport = ({ userId, year }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
        try {
          const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
          if (!token) {
            console.error("토큰이 없습니다. 로그인 필요.");
            return;
          }
      
          // userId를 URL 경로에 포함시켜서 요청
          const response = await axios.get(`/api/attendance/report/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰 추가
            },
          });
      
          console.log("api 데이터:", response.data);
          const data = response.data;
      
          const months = data.map((item) => item.month);
          const attendanceCounts = data.map((item) => item.attendanceCount);
      
          setChartData({
            labels: months.map((month) => `${month}월`),
            datasets: [
              {
                label: "출석 횟수",
                data: attendanceCounts,
                backgroundColor: "rgba(252, 145, 5, 0.91)",
                borderColor: "rgb(192, 141, 75)",
                borderWidth: 1,
              },
            ],
          });
        } catch (error) {
          console.error("Error fetching attendance data:", error);
        }
      };
      

    if (userId) {
      fetchAttendanceData();
    }
  }, [userId, year]);

  if (!chartData || chartData.datasets[0].data.length === 0) {
    return <p>출석 데이터가 없습니다.</p>;
  }

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <h2>{year}년 월별 출석 통계</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
            },
          },
          scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 0,
                    callback: (value) => `${value+1}월`,
                },
            },
            y: {
                beginAtZero: true, 
                min: 0, 
                max: 31,
                ticks: {
                    stepSize: 5,
                }
            }
          }
        }}
      />
    </div>
  );
};

export default AttendanceReport;
