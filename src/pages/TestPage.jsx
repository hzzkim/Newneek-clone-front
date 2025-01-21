import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CrawlingTest = () => {
    const [lists, setLists] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/test'); // Spring Boot API URL
                setLists(response.data); // 데이터를 리스트로 저장
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };

        fetchLists();
    }, []);

    return (
        <div style={{ marginTop: "100px" }}>
            <h1>Test Crawling</h1>
            {error && <p>{error}</p>}
            <pre>{lists}</pre> {/* 크롤링된 결과를 <pre> 태그로 출력하여 포맷 유지 */}
        </div>
    );
};

export default CrawlingTest;
