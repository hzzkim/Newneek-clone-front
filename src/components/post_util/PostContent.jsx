import React from 'react';
import styles from './postutil.module.css'
import Action from '../post_util/PostAction'

const PostContent = ({ post, postComments=[], onClick }) => {
  return (
    <div className={`${styles.postContent} ${styles.mbS}`} onClick={onClick}>
      <p className={`${styles.fontS} ${styles.mbS}`}>{post.content}</p>
      {post.image && <img src={post.image} alt={post.content} />}
      
      <Action post={post} postComments={postComments}/>
  </div>
  );
};

export default PostContent;
