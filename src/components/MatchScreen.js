import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MatchScreen.css';

const MatchScreen = () => {
    const [userInfos, setUserInfos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfos = async () => {
            const token = localStorage.getItem('token'); // 인증 토큰을 로컬 저장소에서 가져옴
            try {
                const response = await axios.get('http://127.0.0.1:8000/matching/list', {
                    headers: {
                        Authorization: `Bearer ${token}` // 요청 헤더에 인증 토큰 포함
                    }
                });
                const data = response.data;
                
                setUserInfos(data);
            } catch (error) {
                console.error('Error fetching user infos:', error);
            } finally {
                setIsLoading(false); // 로딩 상태 해제
            }
        };

        fetchUserInfos();
    }, []);

    const handleCancelClick = () => {
        navigate('/'); // 홈 화면으로 이동
    };

    const handleMatchItemClick = (userInfo) => {
        console.log('MatchScreen userInfo:', userInfo); // userInfo 객체 구조를 확인
        navigate('/match-detail', { state: { userInfo } }); // 상세 페이지로 이동
    };

    if (isLoading) {
        return <div>Loading... 로딩 중입니다!</div>; // 로딩 상태 표시
    }

    /*if (userInfos.length === 0) {
        return <div>아직 매칭인원이 부족해요 나중에 다시 로그인해주세요!</div>; // 매칭된 사용자가 없을 때의 상태 표시
    }*/

    const animalImages = {
        "강아지상": '/images/match/f1_dog.png',
        "고양이상": '/images/match/f2_cat.png',
        "햄스터상": '/images/match/f10_hamster.png',
        "사자상": '/images/match/f4_lion.png',
        "호랑이상": '/images/match/f5_tiger.png',
        "곰상": '/images/match/f6_bear.png',
        "토끼상": '/images/match/f7_rabbit.png',
        "늑대상": '/images/match/f8_wolf.png',
        "원숭이상": '/images/match/f11_monkey.png'
    };

    return (
        <div className="match-screen">
            <img 
                src={`${process.env.PUBLIC_URL}/images/match/match_01.png`} 
                alt="match header" 
                className="match-header"
            />
            <div className="match-container">
                {userInfos.map((userInfo, index) => (
                    <div 
                        key={index} 
                        className="match-item" 
                        onClick={() => handleMatchItemClick(userInfo)}
                    >
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/match/match_paper.png`} 
                            alt="paper"
                            className="match-paper"
                        />
                        <img 
                            src={`${process.env.PUBLIC_URL}${animalImages[userInfo.animal]}`} 
                            alt="face"
                            className="match-face"
                        />
                        <div className="match-text">{userInfo.introduce}</div>
                    </div>
                ))}
            </div>
            <button className="cancel-button" onClick={handleCancelClick}>매칭 취소하기</button>
        </div>
    );
};

export default MatchScreen;
