// SurveyFinal.js
import React, { useContext } from 'react';
import { SurveyContext } from './SurveyContext';
import { useNavigate } from 'react-router-dom';

const SurveyFinal = () => {
  const { surveyData } = useContext(SurveyContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        alert('설문이 성공적으로 제출되었습니다.');
        navigate('/completion-page');
      } else {
        alert('제출 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>설문 완료</h1>
      <button onClick={handleSubmit}>제출하기</button>
    </div>
  );
};

export default SurveyFinal;
