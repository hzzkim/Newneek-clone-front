import React, { useEffect, useState } from "react";
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
    <main className='relative flex min-h-screen w-full max-w-screen-xl flex-1 flex-row mx-auto my-0 pl-safe-left-4 pr-safe-right-4 pt-16'>
      {/* 왼쪽 */}
      <aside className='custom-scroll-bar sticky top-16 z-40 h-[calc(100vh-64px)] w-[216px] flex-col py-7 xl:flex'>
        {isGrounds ? null : groundId && <GroundProfile id={groundId} />}
      </aside>

      {/* 중앙 */}
      <div className='mx-auto flex w-full max-w-screen-sm'>
        <Outlet />
      </div>

      {/* 오른쪽 */}
      <aside className='custom-scroll-bar sticky top-16 z-40 h-[calc(100vh-64px)] w-[238px] flex-col py-7 xl:flex'>
      </aside>
    </main>
  );
}

export default MainPage;
