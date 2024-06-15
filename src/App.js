import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import SurveyLogin from './components/SurveyLogin';
import SurveyName from './components/SurveyName';
import SurveyKakaoID from './components/SurveyKakaoID';
import SurveyStudentInfo from './components/SurveyStudentInfo';
import SurveyGender from './components/SurveyGender';
import SurveyInterest from './components/SurveyInterest';
import SurveyMBTI from './components/SurveyMBTI';
import SurveySmoking from './components/SurveySmoking';
import SurveyFace from './components/SurveyFace';
import SurveyIntro from './components/SurveyIntro';
import MatchScreen from './components/MatchScreen';
import MatchDetailScreen from './components/MatchDetailScreen';
import { SurveyProvider } from './components/SurveyContext';

const App = () => {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/login" element={<SurveyLogin />} />
          <Route path="/survey" element={<SurveyLogin />} />
          <Route path="/survey-name" element={<SurveyName />} />
          <Route path="/survey-kakaoid" element={<SurveyKakaoID />} />
          <Route path="/survey-studentinfo" element={<SurveyStudentInfo />} />
          <Route path="/survey-gender" element={<SurveyGender />} />
          <Route path="/survey-interest" element={<SurveyInterest />} />
          <Route path="/survey-mbti" element={<SurveyMBTI />} />
          <Route path="/survey-smoking" element={<SurveySmoking />} />
          <Route path="/survey-face" element={<SurveyFace />} />
          <Route path="/survey-intro" element={<SurveyIntro />} />
          <Route path="/match-screen" element={<MatchScreen />} />
          <Route path="/match-detail" element={<MatchDetailScreen />} /> {/* 새로 추가된 부분 */}
        </Routes>
      </Router>
    </SurveyProvider>
  );
};

export default App;
