import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostProfile from '../post_util/PostProfile.jsx';
import PostContent from '../post_util/PostContent.jsx';
import styles from './postutil.module.css';

const PostOrCommentItem = ({ post, author, postComments, replies }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/${author.id}/post/${post.id}`);
  };

  const isPost = postComments.length > 0;
  const containerStyle = isPost || replies.length > 0 ? styles.postContainer : styles.commentContainer;

  return (
    <div className={containerStyle}>
      <PostProfile author={author} post={post} />
      <PostContent post={post} postComments={postComments} onClick={handlePostClick} />
    </div>
  );
};

export default PostOrCommentItem;
