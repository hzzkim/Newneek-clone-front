import React from 'react';
import { useParams } from 'react-router-dom';
import PostOrCommentItem from '../post_util/PostOrCommentItem';
import styles from './ground.module.css';
import content from '../../content';
import users from '../../user';

function GroundPost() {
  const { id } = useParams();

  const selectedGround = content
    .filter((content) => content.groundId === parseInt(id) && content.parentId === null);

  if (selectedGround.length === 0) {
    return <div>게시물이 존재하지 않아요!</div>;
  }

  return (
    <div className={styles.container}>
      {selectedGround.map((post) => {
        const author = users.find(user => user.id === post.userId);
        const postComments = content.filter(content => content.parentId === post.id);
        
        // 최신 댓글과 그에 대한 대댓글 필터링
        const latestComment = postComments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const repliesToLatestComment = latestComment 
          ? content.filter(content => content.parentId === latestComment.id) 
          : [];

        return (
          <React.Fragment key={post.id}>
            {/* 게시물 */}
            <PostOrCommentItem 
              post={post} 
              author={author} 
              postComments={postComments} 
              replies={[]} 
            />

            {/* 최신 댓글 및 그에 대한 대댓글 */}
            {latestComment && (
              <div>
                <PostOrCommentItem 
                  post={latestComment} 
                  author={users.find(u => u.id === latestComment.userId)} 
                  postComments={[]} 
                  replies={repliesToLatestComment}
                />
                
                {/* 최신 댓글에 대한 대댓글 */}
                {repliesToLatestComment.map(reply => (
                  <PostOrCommentItem 
                    key={reply.id} 
                    post={reply} 
                    author={users.find(u => u.id === reply.userId)} 
                    postComments={[]} 
                    replies={[]}
                  />
                ))}
                <div className={styles.line}></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default GroundPost;
