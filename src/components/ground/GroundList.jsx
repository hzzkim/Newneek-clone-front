import React from 'react';
import { useNavigate } from 'react-router-dom';
import ground from '../../ground';
import styles from './ground.module.css';

function GroundList() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/ground/${id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <h3 className={styles.mbS}>전체 그라운드</h3>
        <p className={`${styles.fontL} ${styles.mbL}`}>
          관심있는 주제의 그라운드에 참여하고, 뉴니커와 함께 지식을 나눠요
        </p>
        {ground.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.listItem} ${styles.mbL}`}
            onClick={()=>handleClick(ground.id)}
          >
            <div className={styles.listProfile}>
              <img src={ground.img} alt={ground.title} />
            </div>
            <div className={styles.listDetail}>
              <h5 className={styles.fontL}>{ground.title}</h5>
              <p className={styles.fontS}>{ground.content}</p>
              <span className={`${styles.fontS} ${styles.mbS}`}>
                👤 {ground.member}명
                <span className={styles.tag}>{ground.category}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroundList;