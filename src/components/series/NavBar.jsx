import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import styles from "../../assets/Series.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NavBar({ activeTab, onFilter, navVisible }) {
  const scrollRef = useRef(null);

  const tabs = [
    { name: "전체", path: "/" },
    { name: "뉴닉", path: "/newneek" },
    { name: "추천", path: "/recommends" },
    { name: "팔로잉", path: "/following" },
    { name: "경제", path: "/economy" },
    { name: "정치/사회", path: "/politics-society" },
    { name: "문화/트렌드", path: "/culture-trends" },
    { name: "AI", path: "/ai" },
    { name: "커리어", path: "/career" },
    { name: "세계", path: "/world" },
    { name: "비즈니스", path: "/business" },
    { name: "예술", path: "/art" },
    { name: "디자인", path: "/design" },
    { name: "음악", path: "/music" },
    { name: "음식/요리", path: "/food" },
    { name: "패션/뷰티", path: "/fashion-beauty" },
    { name: "건강", path: "/health" },
    { name: "기후/환경", path: "/climate-environment" },
    { name: "과학/기술", path: "/science-technology" },
    { name: "도서/문학", path: "/books-literature" },
    { name: "언어", path: "/language" },
    { name: "여행", path: "/travel" },
    { name: "육아", path: "/parenting" },
    { name: "심리/철학", path: "/psychology-philosophy" },
    { name: "역사", path: "/history" },
    { name: "교육", path: "/education" },
    { name: "인권", path: "/human-rights" },
    { name: "비건", path: "/vegan" },
    { name: "리뷰", path: "/reviews" },
    { name: "라이프", path: "/life" },
  ];

  const handleTabClick = (tab) => {
    console.log("Tab clicked:", tab.name);
    onFilter(tab.name);
  };
  useEffect(() => {
    const activeTabElement = document.querySelector(`.${styles.active}`);
    if (activeTabElement) {
      activeTabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    navVisible && (
      <div className={styles.navBar}>
        <Slider {...settings}>
          {tabs.map((tab) => (
            <div key={tab.name} className={styles.slickSlide}>
              <div
                className={`${styles.tabItem} ${
                  activeTab === tab.name ? styles.active : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    )
  );
}

export default NavBar;
