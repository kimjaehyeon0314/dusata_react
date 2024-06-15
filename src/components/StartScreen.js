// src/components/StartScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

const StartScreen = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSurveyClick = () => {
    navigate('/survey');
  };

  return (
    <div className="start-screen">
      <div className="start-screen-1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/시작화면_1.png)` }} />
      <div className="start-screen-2" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/시작화면_2.png)` }} />
      <button className="start-survey-button" onClick={handleSurveyClick}>설문 시작</button>
      <button className="login-button" onClick={handleLoginClick}>로그인</button>
      <div className="beta-info">2024.06 Beta</div>
    </div>
  );
};

export default StartScreen;
