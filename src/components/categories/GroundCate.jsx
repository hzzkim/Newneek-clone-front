import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 라이브러리 임포트
import '../../assets/styleSheet.css';

function GroundCate() {
    // 카테고리 상태 관리
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    // 카테고리 조회 (GET)
    useEffect(() => {
        axios.get('/api/categories/ground/list')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // 새 카테고리 추가 (POST)
    const handleAddCategory = () => {
        const category = { name: newCategory };
        axios.post('/api/categories/ground/add', category)
            .then(response => {
                setCategories([...categories, response.data]); // 상태에 새 카테고리 추가
                setNewCategory(""); // 입력값 초기화
            })
            .catch(error => console.error('Error adding category:', error));
    };

    // 카테고리 수정 (PUT)
    const handleEditCategory = (id) => {
        const updatedCategory = { name: editCategoryName };

        // 디버깅용 로그
        console.log("수정할 카테고리 id: ", id);
        console.log("수정할 카테고리 이름: ", updatedCategory.name);

        axios.put(`/api/categories/ground/update/${id}`, updatedCategory)
            .then(response => {
                setCategories(categories.map(category => 
                    category.groundCategoryId === id ? response.data : category
                ));
                setEditCategoryId(null); // 수정 모드 종료
                setEditCategoryName(""); // 입력값 초기화
            })
            .catch(error => console.error('Error updating category:', error));
    };

    // 카테고리 삭제 (DELETE)
    const handleDeleteCategory = (id) => {
        axios.delete(`/api/categories/ground/delete/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category.groundCategoryId !== id));
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    return (
        <div className='main-div flex flex-col gap-3 max-w-screen-sm w-full mx-auto md:px-9 md:border-x md:border-x-gray-100'>
            <h1>그라운드 카테고리 관리</h1>

            {/* 카테고리 추가 */}
            <div>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="새 카테고리 이름"
                />
                <button onClick={handleAddCategory}>추가</button>
            </div>

            {/* 카테고리 리스트 */}
            <ul>
                {categories.length === 0 ? (
                    <li>카테고리가 없습니다</li>
                ) : (
                    categories.map((category) => (
                        <li key={category.groundCategoryId}>
                            {editCategoryId === category.groundCategoryId ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editCategoryName}
                                        onChange={(e) => setEditCategoryName(e.target.value)}
                                    />
                                    <button onClick={() => handleEditCategory(category.groundCategoryId)}>저장</button>
                                    <button onClick={() => setEditCategoryId(null)}>취소</button>
                                </div>
                            ) : (
                                <div>
                                    <span>{category.name}</span>
                                    <button onClick={() => {
                                        setEditCategoryId(category.groundCategoryId);
                                        setEditCategoryName(category.name);
                                    }}>편집</button>
                                    <button onClick={() => handleDeleteCategory(category.groundCategoryId)}>삭제</button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default GroundCate;
