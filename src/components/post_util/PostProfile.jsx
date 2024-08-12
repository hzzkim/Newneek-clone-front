import React from 'react';
import { formatDate } from '../../format';
import styles from './postutil.module.css'

const PostProfile = ({ author, post }) => {
  return (
    <div className={`${styles.profileContainer} ${styles.mbS}`}>
      <div className={styles.profileImgContainer}>
        <img src={author.profile} alt={author.name} />
      </div>
      <div>
        <p>{author.name}</p>
        <p className={`${styles.fontS} ${styles.fontGrey}`}>
          {formatDate(post.date)}
          &nbsp;∙&nbsp;<span className={`${styles.fontS} ${styles.fontRed}`}>팔로우</span>
        </p>
      </div>
    </div>
  );
};

export default PostProfile;
