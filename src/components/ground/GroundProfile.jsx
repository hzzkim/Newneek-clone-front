import React from 'react';
import ground from '../../ground';
import styles from '../../assets/ground.module.css'

function GroundProfile({id}) {
  const selectedGround = ground.find((item) => item.id === parseInt(id));

  return (
    <div className={styles.container} style={{marginTop:'20px'}}>
      <div className={styles.profilecontainer}>
        <div className={`${styles.profileImg} ${styles.mbS}`}>
          <img src={selectedGround.img} alt={selectedGround.title} />
        </div>
        <p className={`${styles.fontS} ${styles.fontGrey}`}>그라운드</p>
        <h2 className={`${styles.fontL} ${styles.mbS}`}>{selectedGround.title}</h2>
        <p className={`${styles.fontS} ${styles.mbS} ${styles.fontGrey}`}>{selectedGround.content}</p>

        <p className={`${styles.fontS} ${styles.mbL} ${styles.fontGrey}`}>소개 더 보기 ></p>

        <span className={`${styles.fontS} ${styles.mbL} ${styles.fontGrey}`}>
          멤버 {selectedGround.member}명
          <span className={styles.tag}>{selectedGround.category}</span>
        </span>
        <button className={`${styles.orangeBtn} ${styles.fontS}`}>그라운드 참여하기</button>
      </div>
    </div>
  );
}

export default GroundProfile;
