import React from "react";
import ArticleData from "../../ArticleData";
import styles from "../../assets/Series.module.css";
import { useParams } from "react-router-dom";
import SeriesProfile from "./SeriesProfile";

function SeriesDetail() {
  const { id } = useParams(); // URL에서 id 가져오기

  // id에 해당하는 시리즈 찾기
  const series = ArticleData.find(
    (serie) => serie.seriesId === parseInt(id, 10)
  );

  if (!series) {
    return <div>콘텐츠를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.articleList}>
      <SeriesProfile series={series} />

      <div className={styles.articleCount}>
        아티클 {series.articles.length}개
      </div>
      {series.articles.map((content) => (
        <article key={content.id} className={styles.articleItem}>
          <h2 className={styles.articleTitle}>{content.title}</h2>
          <p className={styles.articleContent}>{content.description}</p>
          <div className={styles.articleMeta}>
            <img
              src={content.authorAvatar || "default_avatar_url"}
              alt="작성자 아바타"
              className={styles.authorAvatar}
            />
            <span className={styles.authorName}>{content.author}</span>
            <span className={styles.postTime}>{content.time}</span>
            <span className={styles.readCount}>읽음 {content.readCount}</span>
          </div>
          <div className={styles.articleInteractions}>
            <button className={styles.interactionBtn}>
              <span>♥</span> {content.likes}
            </button>
            <button className={styles.interactionBtn}>
              <span>💬</span> {content.comments}
            </button>
            <button className={styles.interactionBtn}>
              <span>🔖</span> 0
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SeriesDetail;
