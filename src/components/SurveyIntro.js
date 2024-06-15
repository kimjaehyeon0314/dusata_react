import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyIntro.css';

const SurveyIntro = () => {
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNextClick = async () => {
    if (!intro) {
      alert('자기소개를 입력해주세요.');
    } else if (intro.length > 50) {
      alert('자기소개는 50자 이내로 입력해주세요.');
    } else {
      const updatedSurveyData = { ...surveyData, introduce: intro };
      setSurveyData(updatedSurveyData);
      setLoading(true);

      const payload = {
        phone_number: updatedSurveyData.phone_number,
        user_name: updatedSurveyData.user_name,
        user_kakao: updatedSurveyData.user_kakao,
        major: updatedSurveyData.major,
        student_number: parseInt(updatedSurveyData.student_number, 10),
        gender: updatedSurveyData.gender,
        hobby: updatedSurveyData.hobby,
        mbti: updatedSurveyData.mbti,
        smoke: updatedSurveyData.smoke,
        animal: updatedSurveyData.animal,
        introduce: intro
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          navigate('/match-screen');
        } else {
          const errorData = await response.json();
          console.error('Server Error:', errorData); // 서버 에러 디버깅을 위한 출력

          // 서버에서 반환된 에러 메시지 추출
          const errorDetails = errorData.detail && errorData.detail.length > 0 
            ? errorData.detail.map(err => err.msg).join(', ')
            : '서버에 데이터를 전송하는 중 오류가 발생했습니다.';
          alert(`서버에 데이터를 전송하는 중 오류가 발생했습니다: ${errorDetails}`);
        }
      } catch (error) {
        console.error('Network Error:', error);
        alert('서버에 데이터를 전송하는 중 네트워크 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // 현재 SurveyContext의 값을 콘솔에 출력합니다.
  console.log('Current SurveyData:', surveyData);

  return (
    <div className="survey-intro">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 간단한 자기소개</h1>
      <div className="input-container">
        <textarea 
          placeholder="자기소개 입력 (50자 이내로 간단히)" 
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </div>
      <p>간단한 자기소개를 해주세요. 성격, 가치관, 외모, 장점 등을 써주시면 좋아요</p>
      <button className="next-button" onClick={handleNextClick} disabled={loading}>
        {loading ? '저장 중...' : '다음으로'}
      </button>

 
    </div>
  );
};

export default SurveyIntro;
