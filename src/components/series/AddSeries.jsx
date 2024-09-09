import React, { useState, useEffect } from 'react';

const AddSeries = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // 이미지 미리보기를 위해 FileReader 사용
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // 미리보기 이미지 경로 설정
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // API 호출로 카테고리 목록 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/series-categories');
        const data = await response.json(); // 응답을 JSON으로 변환
        setCategories(data); // 가져온 카테고리 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('seriesCategoryId', category); // 선택한 카테고리 ID
    formData.append('userId', '1'); // 실제 사용자의 ID를 넣어야 합니다.
    formData.append('about', description); // 시리즈 소개
    formData.append('profile', image); // 선택한 이미지 파일

    try {
      // fetch로 POST 요청을 전송
      const response = await fetch('http://localhost:8080/api/series', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Series created:', data);
        onClose(); // 완료 후 모달 닫기
      } else {
        console.error('Error creating series:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating series:', error);
    }
  };

  return (
    <div className='relative z-50'>
      <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity opacity-100'></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <div className="relative m-4 flex min-h-[300px] w-full flex-col rounded-lg bg-white p-6 shadow-modal md:p-7 opacity-100 translate-y-0 scale-100"
            style={{maxWidth:'572px', minHeight:'300px'}}>
            {/* 닫기 버튼 */}
            <div className="absolute right-0 top-0 pr-6 pt-6">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={onClose} // 닫기 버튼을 누르면 onClose 호출
              >
                <span className="sr-only">닫기</span>
                <svg className="fill-current text-gray-450" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.35363 18.5607C6.15837 18.756 5.84178 18.756 5.64652 18.5607L4.93942 17.8536C4.74415 17.6584 4.74415 17.3418 4.93942 17.1465L10.5858 11.5001L4.93942 5.85369C4.74415 5.65842 4.74415 5.34184 4.93942 5.14658L5.64652 4.43947C5.84178 4.24421 6.15837 4.24421 6.35363 4.43947L12 10.0859L17.6465 4.43942C17.8418 4.24415 18.1584 4.24415 18.3536 4.43942L19.0607 5.14652C19.256 5.34178 19.256 5.65837 19.0607 5.85363L13.4143 11.5001L19.0607 17.1466C19.256 17.3418 19.256 17.6584 19.0607 17.8537L18.3536 18.5608C18.1584 18.7561 17.8418 18.7561 17.6465 18.5608L12 12.9143L6.35363 18.5607Z" />
                </svg>
              </button>
            </div>

            {/* 제목 */}
            <h3 className="mb-4 border-b border-b-gray-100 pb-4 text-lg font-bold text-gray-700">시리즈 추가</h3>

            {/* 폼 */}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-7">
                {/* 이미지 업로드 */}
                <label className="flex size-24 cursor-pointer rounded-lg border border-gray-100 bg-gray-50 center md:size-[153px]" htmlFor="seriesImage">
                  {/* 이미지 미리보기 표시 */}
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="rounded-lg w-full h-full object-cover" />
                  ) : (
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-7">
                      <circle cx="12.6001" cy="12" r="12" fill="#FAE5C7"></circle>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.3501 6.75C13.3501 6.33579 13.0143 6 12.6001 6C12.1859 6 11.8501 6.33579 11.8501 6.75V11.25H7.3501C6.93588 11.25 6.6001 11.5858 6.6001 12C6.6001 12.4142 6.93588 12.75 7.3501 12.75H11.8501V17.25C11.8501 17.6642 12.1859 18 12.6001 18C13.0143 18 13.3501 17.6642 13.3501 17.25V12.75H17.8501C18.2643 12.75 18.6001 12.4142 18.6001 12C18.6001 11.5858 18.2643 11.25 17.8501 11.25H13.3501V6.75Z" fill="#FF6B00"></path>
                    </svg>
                  )}
                  <input className="hidden" id="seriesImage" type="file" accept="image/*" onChange={handleImageChange} />
                </label>


                {/* 제목 및 소개 */}
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <label className="mb-1 inline-block text-xs font-bold text-gray-500" htmlFor="seriesTitle">시리즈 제목</label>
                    <input type="text" className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900" 
                      id="seriesTitle" placeholder="시리즈 제목을 입력해 주세요" maxLength="20" value={title} onChange={(e) => setTitle(e.target.value)} 
                      style={{boxSizing:'border-box'}}
                    />
                  </div>
                  <div>
                    <label className="mb-1 inline-block text-xs font-bold text-gray-500" htmlFor="seriesDescription">소개</label>
                    <textarea className="flex min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900" 
                      id="seriesDescription" placeholder="시리즈 소개를 입력해 주세요" rows="5" maxLength="150" value={description} onChange={(e) => setDescription(e.target.value)}
                      style={{boxSizing:'border-box'}}
                    />
                  </div>

                  {/* 카테고리 선택 */}
                  <div>
                    <label className="mb-1 inline-block text-xs font-bold text-gray-500" htmlFor="seriesCategory">카테고리</label>
                    <div className="relative">
                      <select className="relative h-12 w-full cursor-pointer rounded-lg bg-white py-3.5 pl-4 pr-12 text-left text-sm ring-1 ring-inset ring-gray-300 text-gray-400" 
                        id="seriesCategory" value={category} onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">카테고리를 선택해 주세요</option>
                        {/* 카테고리 목록 출력 */}
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 완료 버튼 */}
              <div className="flex justify-end">
                <button className="group inline-flex gap-1 rounded-lg items-center justify-center font-bold transition-colors bg-primary-basic text-white hover:bg-primary-hover active:bg-primary-pressed h-9 px-3 text-sm" type="submit">
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSeries;
