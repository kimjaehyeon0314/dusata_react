import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchDetailScreen.css';

const MatchDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = location.state; // 이전 페이지에서 전달된 userInfo를 가져옴

  console.log('MatchDetailScreen userInfo:', userInfo); // userInfo 객체 구조를 확인

  const [showPopup, setShowPopup] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = async () => {
    // 매칭 요청 데이터
    const matchRequestData = {
      partner_id: userInfo.id, // userInfo.id를 실제 파트너 ID로 사용
      // 필요한 다른 필드를 추가하세요
    };
    const token = localStorage.getItem('token');
    try {
      const response = await fetch("http://127.0.0.1:8000/matching/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 실제 토큰으로 교체하세요
        },
        body: JSON.stringify(matchRequestData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.detail); // "매칭 요청이 성공적으로 전송되었습니다."
        // 성공적인 매칭 요청 처리, 예: 성공 메시지 표시
      } else {
        const errorData = await response.json();
        console.error(errorData.detail);
        // 에러 응답 처리, 예: 에러 메시지 표시
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // 네트워크 또는 예기치 않은 에러 처리
    }

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

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
    <div className="match-detail-screen">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <img 
        src={`${process.env.PUBLIC_URL}${animalImages[userInfo.animal]}`} 
        alt={userInfo.animal} 
        className="match-animal" 
      />
      <img 
        src={`${process.env.PUBLIC_URL}/images/match/match_bigpaper.png`} 
        alt="big paper" 
        className="memo"
      />
      <div className="memo-text">
        {userInfo.introduce}
      </div>
      <button className="next-button" onClick={handleNextClick}>매칭하기</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>매칭 정보</h2>
            <p>카카오톡 ID:<span className="highlight"> {userInfo.user_kakao}</span><br />이름: {userInfo.user_name} <br /><br />
            매칭이 신청되었습니다. <br /><br />
            메모지와 회원정보는 일주일 이후 
            자동으로 삭제됩니다.<br />
            문의: dusata@gmail.com
            </p>
            <button onClick={handleClosePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetailScreen;
