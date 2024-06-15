import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyMBTI.css';

const SurveyMbti = () => {
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const [mbti, setMbti] = useState('');

  const handleNextClick = () => {
    const validMbti = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
    if (!mbti || !validMbti.includes(mbti.toUpperCase())) {
      alert('올바른 MBTI를 입력해주세요. 예: ENTP, INTJ, INTP 등');
    } else {
      setSurveyData({ ...surveyData, mbti: mbti.toUpperCase() });
      navigate('/survey-smoking');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-mbti">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. MBTI를 알려주세요</h1>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="MBTI 입력" 
          value={mbti} 
          onChange={(e) => setMbti(e.target.value.toUpperCase())} 
        />
      </div>
      <p className="warning-text">영문자 대문자로 4글자만 입력해주세요<br/>예: ENTP, INTJ, INTP 등</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyMbti;
