import React from "react";
import styles from './modal.module.css'

function Modal({ onClose, user }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalControl}>
          <select name="postSelection" id="postSelection">
            <option value="0">포스트 위치 선택</option>
            <option value="1" selected>포스트 피드</option>
            <option value="2">다른 위치</option>
          </select>
          <button className={styles.modalClose} onClick={onClose}>X</button>
          <hr className={styles.divider}/>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalType}>
            <img src={user.profile} alt="userProfile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div className={styles.modalField}>
              <span className={styles.contents}>
                {user.name} 님의 생각을 나누며 지식을 넓혀 보세요
              </span>
            </div>
          </div>
          <textarea placeholder="여기에 내용을 입력하세요..." style={{ width: '100%', height: '100px', marginTop: '10px' }}></textarea>
          <footer className={styles.modalFooter}>
            <button style={{ position: 'absolute', bottom: '50px', left: '40px', border: 'none', background: 'white', color: 'black' }}>img</button>
            <div style={{ position: 'absolute', bottom: '30px', right: '40px', gap: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <p>0 / 300</p>
              <button className={styles.modalSubmit}>남기기</button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modal;
