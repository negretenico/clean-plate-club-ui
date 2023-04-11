import Header from './components/shared/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './screen/home/Home';
import WhoAreWe from './screen/who/WhoAreWe';
import Menu from './screen/menu/Menu';
import Faq from './screen/faq/Faq';
import SurveyComponent from './components/survey/SurveyComponent';
import KickScreen from './screen/kick/KickScreen';
import Recommendation from './screen/recommendation/Recommendation';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="faq" element={<Faq />} />
            <Route path="kick" element={<KickScreen />} />
            <Route path="menu" element={<Menu />} />
            <Route path="recommendation" element={<Recommendation />} />

            <Route path="survey" element ={<SurveyComponent />} />
            <Route path="who" element={<WhoAreWe />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
