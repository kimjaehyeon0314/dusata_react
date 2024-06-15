import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from './SurveyContext';
import './SurveyFace.css';

const faceImages = [
  { id: 1, src: 'f1', label: '강아지상', selected: false },
  { id: 2, src: 'f2', label: '고양이상', selected: false },
  { id: 10, src: 'f10', label: '햄스터상', selected: false },
  { id: 4, src: 'f4', label: '사자상', selected: false },
  { id: 5, src: 'f5', label: '호랑이상', selected: false },
  { id: 6, src: 'f6', label: '곰상', selected: false },
  { id: 7, src: 'f7', label: '토끼상', selected: false },
  { id: 8, src: 'f8', label: '늑대상', selected: false },
  { id: 11, src: 'f11', label: '원숭이상', selected: false }
];

const SurveyFace = () => {
  const [faces, setFaces] = useState(faceImages);
  const navigate = useNavigate();
  const { surveyData, setSurveyData } = useContext(SurveyContext);

  const handleFaceClick = (id) => {
    const updatedFaces = faces.map(face =>
      face.id === id ? { ...face, selected: true } : { ...face, selected: false }
    );
    setFaces(updatedFaces);
  };

  const handleNextClick = () => {
    const selectedFace = faces.find(face => face.selected);
    if (selectedFace) {
      setSurveyData({ ...surveyData, animal: selectedFace.label });
      navigate('/survey-intro');
    } else {
      alert('얼굴형을 선택해주세요');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="survey-face">
      <img 
        src={`${process.env.PUBLIC_URL}/images/arrow.png`} 
        alt="back" 
        className="back-arrow" 
        onClick={handleBackClick} 
      />
      <div className="progress-bar">
        <div className="progress" />
      </div>
      <h1>Q. 얼굴상을 선택해주세요</h1>
      <div className="face-container">
        {faces.map(face => (
          <div key={face.id} className="face-option" onClick={() => handleFaceClick(face.id)}>
            <img 
              src={`${process.env.PUBLIC_URL}/images/face/${face.src}_${face.selected ? '1' : '0'}.png`} 
              alt={`face ${face.id}`} 
              className="face-image"
            />
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNextClick}>다음으로</button>
    </div>
  );
};

export default SurveyFace;
