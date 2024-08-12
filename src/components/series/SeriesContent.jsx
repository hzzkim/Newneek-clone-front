import styles from "../../assets/Series.module.css";

function SeriesContent({ img, title, time, articles, author, authorImg, tag }) {
  return (
    <div className={styles.contentItem}>
      <img src={img} alt={title} className={styles.contentImg} />
      <div className={styles.itemDetails}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemInfo}>
          {time} 전 업데이트 <span className={styles.dot}>·</span>{" "}
          <span className={styles.articles}>아티클 {articles}개</span>
        </p>
        <div className={styles.author}>
          {authorImg && (
            <img src={authorImg} alt={author} className={styles.authorImg} />
          )}
          <span className={styles.authorName}>{author}</span>
          {tag && <span className={styles.tag}>{tag}</span>}
        </div>
      </div>
    </div>
  );
}

export default SeriesContent;
