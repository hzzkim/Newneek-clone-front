import React, { useEffect, useState } from "react";
import styles from '../assets/Main.module.css';
import GroundProfile from "../components/ground/GroundProfile";
import { Outlet, useLocation, useParams } from "react-router-dom";
import groundContent from '../content';  // Post 데이터베이스 예시

function MainPage() {
  const location = useLocation();
  const { id, postId } = useParams(); // URL의 id와 postId를 가져옴
  const [groundId, setGroundId] = useState(null);

  useEffect(() => {
    
    window.scrollTo(0, 0); // 페이지가 변경될 때마다 최상단으로 스크롤

    if (id) { // /ground/:id 경로에 있는 경우
      setGroundId(id);
    }
    else if (postId) { // /:author/post/:postid 경로에 있는 경우 postId로 groundId를 찾음
      const foundPost = groundContent.find((content) => content.id === parseInt(postId));
      if (foundPost) {
        setGroundId(foundPost.groundId);
      }
    }
  }, [location, id, postId]);

  const isGrounds = location.pathname.startsWith('/grounds');

  return (
    <div className={styles.main}>
      <div className={styles.parent}>
        {/* 왼쪽 */}
        <div className={styles.child1}>
          {isGrounds ? null : groundId && <GroundProfile id={groundId} />}
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
