import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyInterest.css';

const interests = [
  { id: '36', label: '독서' },
  { id: '37', label: '사진' },
  { id: '38', label: '게임' },
  { id: '39', label: '음악' },
  { id: '40', label: '여행' },
  { id: '41', label: '그림' },
  { id: '42', label: '시사' },
  { id: '43', label: '봉사' },
  { id: '44', label: '요리' },
  { id: '45', label: '동물' },
  { id: '46', label: '운동' },
  { id: '47', label: '패션' },
];

const SurveyInterest = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInterestClick = (id) => {
    setSelectedInterests((prevSelectedInterests) =>
      prevSelectedInterests.includes(id)
        ? prevSelectedInterests.filter((interest) => interest !== id)
        : [...prevSelectedInterests, id]
    );
  };

  const handleNextClick = () => {
    if (selectedInterests.length === 0) {
      alert('관심사를 최소 하나 선택해주세요.');
    } else {
      const selectedLabels = selectedInterests.map(id => interests.find(interest => interest.id === id).label);
      const selectedLabelsString = selectedLabels.join(', ');
      setSurveyData({ ...surveyData, hobby: selectedLabelsString });
      navigate('/survey-mbti');
    }
  };

  return (
    <div className="survey-interest">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 관심사를 선택해주세요</h1>
      <div className="interests-container">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className="interest-option"
            onClick={() => handleInterestClick(interest.id)}
          >
            <img
              className="interest-icon"
              src={`${process.env.PUBLIC_URL}/images/Interest/Frame ${interest.id}_${selectedInterests.includes(interest.id) ? '1' : '0'}.png`}
              alt={interest.label}
            />
          </div>
        ))}
      </div>
      <p>지금부터 입력하는 정보는 나만 볼 수 있는 정보에요</p>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyInterest;
