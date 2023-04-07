import Header from './components/shared/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './screen/home/Home';
import WhoAreWe from './screen/who/WhoAreWe';
import Menu from './screen/menu/Menu';
import Faq from './screen/faq/Faq';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="who" element={<WhoAreWe />} />
            <Route path="menu" element={<Menu />} />
            <Route path="faq" element={<Faq />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
