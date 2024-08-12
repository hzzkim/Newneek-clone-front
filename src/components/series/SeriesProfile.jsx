import React from "react";
import styles from "../../assets/Series.module.css";

function SeriesProfile({ series }) {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.seriesHeader}>
        <img
          src={series.icon}
          alt="Series Icon"
          className={styles.seriesIcon}
        />
      </div>
      <div className={styles.seriesInfo}>
        <p className={styles.seriesCategory}>시리즈</p>
        <h1 className={styles.seriesTitle}>{series.title}</h1>
        <div className={styles.seriesTags}>
          <span className={styles.seriesTag}>{series.category}</span>
        </div>
        <div className={styles.seriesAuthor}>
          <img
            src={series.authorProfile}
            alt="Author Profile"
            className={styles.authorIcon}
          />
          <span className={styles.authorName}>{series.author}</span>
          <span className={styles.authorId}>@{series.authorId}</span>
        </div>
        <p className={styles.seriesMeta}>
          {series.updatedAt} • 아티클 {series.articleCount}개
        </p>
      </div>
    </div>
  );
}

export default SeriesProfile;
