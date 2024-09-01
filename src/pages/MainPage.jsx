import React, { useEffect, useState } from "react";
import styles from '../assets/Main.module.css';
import StickyNav from "../components/StickyNav";
import { Outlet, useLocation, useParams } from "react-router-dom";

function MainPage() {
  const location = useLocation();

  useEffect(() => {
    // 페이지가 변경될 때마다 최상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  // 특정 경로에서만 StickyNav를 렌더링
  const showStickyNav = ['/articles', '/', '/posts'].includes(location.pathname);

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        {/* 왼쪽 */}
        <div className={styles.child1}>
        </div>

        {/* 중앙 */}
        <div className={styles.child2}>
          {showStickyNav && <StickyNav />}
          <Outlet />
        </div>

        {/* 오른쪽 */}
        <div className={styles.child3}>
          {/* 추가 요소 */}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
