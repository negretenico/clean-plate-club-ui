import Header from './components/shared/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './screen/home/Home';
import WhoAreWe from './screen/who/WhoAreWe';
import Menu from './screen/menu/Menu';
import Faq from './screen/faq/Faq';
import SurveyComponent from './components/survey/SurveyComponent';
import KickScreen from './screen/kick/KickScreen';
import RegistrationScreen from './screen/registration/RegistrationScreen';
import LoginScreen from './screen/login/LoginScreen';
import DuplicateEmailScreen from './screen/error/DuplicateEmailScreen';
import { LoginContextProvider } from './hooks/loginContext';
import { ShoppingCartProvider } from './hooks/shoppingContext';
import Checkout from './screen/checkout/Checkout';
import OrderConfirmation from './screen/order-confirmation/OrderConfirmation';
import './App.css';
import Profile from './screen/profile/Profile';
function App (): JSX.Element {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <LoginContextProvider>
          <div className="App">
            <Header/>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="checkout" element={<Checkout />} />
              <Route path="duplicateemail" element={<DuplicateEmailScreen/>}/>
              <Route path="faq" element={<Faq />} />
              <Route path="kick" element={<KickScreen />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="menu" element={<Menu />} />
              <Route path="order-confirmation" element = {<OrderConfirmation/>}/>
              <Route path = "profile" element ={<Profile/>} />
              <Route path="signup" element={<RegistrationScreen />} />
              <Route path="survey" element ={<SurveyComponent />} />
              <Route path="who" element={<WhoAreWe />} />
            </Routes>
          </div>
        </LoginContextProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
