import React from 'react';
import styles from './postutil.module.css';

const Actions = ({ post, postComments = [] }) => (
  <div className={`${styles.actionContainer} ${styles.mtL}`}>
    <p className={styles.likes}>
      <button>좋아요</button>
      &nbsp;&nbsp;❤️‍🔥{post.likes || 0}
    </p>
    <div className={styles.actionBtns}>
      <button className={styles.actionBtn}>💬 {postComments.length}</button>
      <button className={styles.actionBtn}>📁</button>
      <button className={styles.actionBtn}>🔗</button>
    </div>
  </div>
);

export default Actions;
