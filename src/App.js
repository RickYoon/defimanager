import React from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import Topnav from './components/layout/Topnav';
import Mainpage from './components/pages/Mainpage'
import Detailpage from './components/pages/Detailpage'
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
      </Routes>
    </Router>
  );
}

export default App;
