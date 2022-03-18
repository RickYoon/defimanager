import React from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import Topnav from './components/layout/Topnav';
import TopLogo from './components/layout/TopLogo';
import Footer from './components/layout/Footer';
import Mainpage from './components/pages/Mainpage'
import Detailpage from './components/pages/Detailpage'
import Newspage from './components/pages/Newspage'
import Faqpage from './components/pages/Faqpage'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Topnav />} />
        <Route exact path="/news" element={<Topnav />} />
        <Route exact path="/faq" element={<Topnav />} />
        <Route exact path="/project/:id" element={<TopLogo />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route exact path="/news" element={<Newspage />} />
        <Route exact path="/faq" element={<Faqpage />} />
        <Route exact path="/project/:id" element={<Detailpage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Footer />} />
        <Route exact path="/news" element={<Footer />} />
        <Route exact path="/faq" element={<Footer />} />
      </Routes>



    </Router>
  );
}

export default App;
