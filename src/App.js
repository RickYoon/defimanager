import React from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import Topnav from './components/layout/Topnav';
import Mainpage from './components/pages/Mainpage'
import Detailpage from './components/pages/Detailpage'
// import Newspage from './components/pages/Newspage'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <Router>
      <GlobalStyles />
      <Topnav />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route exact path="/project/:id" element={<Detailpage />} />
        {/* <Route exact path="/news" element={<Newspage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
