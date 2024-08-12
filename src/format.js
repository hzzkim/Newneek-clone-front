export function formatDate(dateString) {
    const postDate = new Date(dateString); // 게시물 작성 시간
    const now = new Date(); // 현재 시간
    const diffInMilliseconds = now - postDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
  
    if (diffInHours >= 24) {
      // 24시간 이상 경과한 경우
      return postDate.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 출력
    } else if (diffInHours > 1) {
      // 1시간 이상 경과한 경우
      return `${diffInHours}시간 전`;
    } else {
      // 1시간 이내
      return `${diffInMinutes}분 전`;
    }
  }
  