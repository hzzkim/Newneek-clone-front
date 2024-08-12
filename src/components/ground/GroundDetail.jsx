import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import users from '../../user';
import content from '../../content';
import ground from '../../ground';
import PostProfile from '../post_util/PostProfile';
import PostOrCommentItem from '../post_util/PostOrCommentItem';
import Action from '../post_util/PostAction';
import styles from './ground.module.css';
import Modal from '../modal/Modal';

function GroundDetail() {
  const { author, post } = useParams();
  const [foundAuthor, setFoundAuthor] = useState(null);
  const [foundPost, setFoundPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [foundGround, setFoundGround] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 가상 데이터
  const loggedInUserId = 2;
  const loggedInUser = users.find(user => user.id === loggedInUserId);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const authorId = parseInt(author);
    const postId = parseInt(post);
    const foundAuthor = users.find(user => user.id === authorId);
    const foundPost = content.find(post => post.id === postId);

    // foundPost가 존재하는 경우에만 groundId를 참조
    if (foundPost) {
      const foundGround = ground.find(ground => ground.id === foundPost.groundId);
      setFoundGround(foundGround);
    }

    const comments = content.filter(comment => comment.parentId === postId);

    setFoundAuthor(foundAuthor);
    setFoundPost(foundPost);
    setPostComments(comments);
  }, [author, post]);

  // foundAuthor, foundPost, foundGround가 모두 존재할 때만 렌더링
  if (!foundAuthor || !foundPost || !foundGround) {
    return <div>Loading...</div>;
  }

  // 댓글 필터링
  const comments = content.filter((content) => content.parentId === foundPost.id);
  const replies = (commentId) => content.filter((content) => content.parentId === commentId);

  const renderParentPost = () => {
    const parentPost = content.find(post => post.id === foundPost.parentId);
    if (parentPost) {
      const parentAuthor = users.find(user => user.id === parentPost.userId);
      return (
        <div className={styles.parentContainer}>
        <div className={styles.parentPost}>
          {parentAuthor.profile ? 
            <div className={styles.parentImg}>
              <img src={parentAuthor.profile} alt={parentAuthor.name}/>
            </div>
          : null
          }
          <span>{parentAuthor.name}</span>
          <p>{parentPost.content}</p>
        </div>
        <div className={styles.verticalLine}></div>
        </div>
      );
    } else {
      return <p>원글을 찾을 수 없음.</p>;
    }
  };

  return (
    <div className={styles.deatilContainer}>
      {foundPost.parentId !== null && (
        <div>
          {renderParentPost()}
        </div>
      )}

      <div className={`${styles.mbL}`}>
        <Link to={`/ground/${foundGround.id}`} className={`${styles.fontS} ${styles.fontGrey}`}>
          👤{foundGround.title}&nbsp;>
        </Link>
      </div>
      <PostProfile author={foundAuthor} post={foundPost} />
      <p className={`${styles.fontS} ${styles.mbS}`}>{foundPost.content}</p>
      {foundPost.image && <img src={foundPost.image} alt={foundPost.content} style={{width:'100%'}}/>}
      <Action post={foundPost} postComments={postComments} />
      <div className={`${styles.line}`}></div>

      {/* 답글 작성 */}
      <div className={styles.mbL}>
        <h3 className={styles.mbL}>답글&nbsp;{postComments.length}</h3>
        <div className={`${styles.typeField} ${styles.mbL}`}>
          <div className={styles.tyleFieldImg}>
            <img src={loggedInUser.profile} alt="blankProfile" />
          </div>
          <button onClick={openModal}>{loggedInUser.name} 님의 생각을 나누며 지식을 넓혀 보세요</button>
        </div>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <Modal onClose={closeModal} user={loggedInUser} />
      )}

      {/* 댓글 및 대댓글 렌더링 */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <PostOrCommentItem 
            post={comment} author={users.find(u => u.id === comment.userId)} 
            postComments={[]} replies={replies(comment.id)}
          />
          
          {/* 대댓글 렌더링 */}
          {replies(comment.id).map(reply => (
            <PostOrCommentItem 
              key={reply.id} post={reply} author={users.find(u => u.id === reply.userId)} 
              postComments={[]} replies={[]}
            />
          ))}
          <div className={styles.line}></div>
        </div>
      ))}
    </div>
  );
}

export default GroundDetail;
