import Header from './components/shared/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './screen/home/Home';
import WhoAreWe from './screen/who/WhoAreWe';
import Menu from './screen/menu/Menu';
import Faq from './screen/faq/Faq';
import SurveyComponent from './components/survey/SurveyComponent';
import KickScreen from './screen/kick/KickScreen';
import Recommendation from './screen/recommendation/Recommendation';
import RegistrationScreen from './screen/registration/RegistrationScreen';
import LoginScreen from './screen/login/LoginScreen';
import DuplicateEmailScreen from './screen/error/DuplicateEmailScreen';
import { LoginContextProvider } from './hooks/loginContext';

function App (): JSX.Element {
  return (
    <LoginContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="duplicateemail" element={<DuplicateEmailScreen/>}/>
            <Route path="faq" element={<Faq />} />
            <Route path="kick" element={<KickScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="menu" element={<Menu />} />
            <Route path="recommendation" element={<Recommendation />} />
            <Route path="signup" element={<RegistrationScreen />} />

            <Route path="survey" element ={<SurveyComponent />} />
            <Route path="who" element={<WhoAreWe />} />

          </Routes>

        </BrowserRouter>
      </div>
    </LoginContextProvider>
  );
}

export default App;
