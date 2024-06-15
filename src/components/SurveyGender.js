import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyGender.css';

const SurveyGender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  const handleNextClick = () => {
    if (selectedGender) {
      setSurveyData({ ...surveyData, gender: selectedGender });
      navigate('/survey-interest');
    } else {
      alert('성별을 선택해주세요');
    }
  };

  return (
    <div className="survey-gender">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 성별을 알려주세요</h1>
      <div className="gender-container">
        <div
          className={`gender-option ${selectedGender === 'male' ? 'selected' : ''}`}
          onClick={() => handleGenderClick('male')}
        >
          <img
            className="gender-icon"
            src={`${process.env.PUBLIC_URL}/images/${selectedGender === 'male' ? 'male_1' : 'male_0'}.png`}
            alt="male"
          />
        </div>
        <div
          className={`gender-option ${selectedGender === 'female' ? 'selected' : ''}`}
          onClick={() => handleGenderClick('female')}
        >
          <img
            className="gender-icon"
            src={`${process.env.PUBLIC_URL}/images/${selectedGender === 'female' ? 'female_1' : 'female_0'}.png`}
            alt="female"
          />
        </div>
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyGender;
