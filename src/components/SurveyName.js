// src/components/SurveyName.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyName.css';

const SurveyName = () => {
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const [name, setName] = useState('');

  const handleNextClick = () => {
    if (!name) {
      alert('이름을 입력해주세요.');
    } else {
      setSurveyData({ ...surveyData, user_name: name });
      navigate('/survey-kakaoid');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-name">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 이름을 알려주세요</h1>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="이름입력" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyName;
