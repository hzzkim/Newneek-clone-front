import React, { useEffect, useState } from "react";
import styles from '../assets/Main.module.css';
import SeriesProfile from "../components/series/SeriesProfile";
import { Outlet, useLocation, useParams } from "react-router-dom";
import seriesData from '../ArticleData';  // Series 데이터베이스 예시

function MainPage() {
  const location = useLocation();
  const { seriesId } = useParams(); // URL의 seriesId를 가져옴
  const [foundSeries, setFoundSeries] = useState(null);

  useEffect(() => {
    // 페이지가 변경될 때마다 최상단으로 스크롤
    window.scrollTo(0, 0);

    // /:author/series/:seriesId 경로에 있는 경우 seriesId로 시리즈를 찾음
    if (seriesId) {
      const series = seriesData.find((series) => series.seriesId === parseInt(seriesId));
      if (series) {
        setFoundSeries(series);
      }
    }
  }, [location, seriesId]);

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        {/* 왼쪽 */}
        <div className={styles.child1}>
          {foundSeries && <SeriesProfile series={foundSeries} />}
        </div>

        {/* 중앙 */}
        <div className={styles.child2}>
          <Outlet />
        </div>

        {/* 오른쪽 */}
        <div className={styles.child3}>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
