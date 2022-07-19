import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from './assets/styles/GlobalStyles';

// import Topnav from './components/layout/Topnav';
import Footer from './components/layout/Footer';
import Detailpage from './components/pages/Detailpage'
import Newspage from './components/pages/Newspage'

import Overview from './pages/overview/Overview'
import Topnav from './layout/Topnav';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Topnav />} />
        <Route exact path="/news" element={<Topnav />} />
        <Route exact path="/project/:id" element={<Topnav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route exact path="/news" element={<Newspage />} />
        <Route exact path="/project/:id" element={<Detailpage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Footer />} />
        <Route exact path="/news" element={<Footer />} />
        <Route exact path="/project/:id" element={<Footer />} />
      </Routes>



    </Router>
  );
}

export default App;
