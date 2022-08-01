import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from './assets/styles/GlobalStyles';
import ScrollToTop from 'util/ScrollTop';

// import Topnav from './components/layout/Topnav';
import Footer from './components/layout/Footer';
import Detailpage from './components/pages/Detailpage'
import Newspage from './components/pages/Newspage'
// import Poolpage from 'components/pages/Poolpage';

import Overview from './pages/overview/Overview'
import Topnav from './layout/Topnav';
import TopnavDetail from './layout/TopnavDetail'
import Detail from './pages/detail/Detail'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Topnav />} />
        <Route exact path="/news" element={<Topnav />} />
        <Route exact path="/project/:id" element={<TopnavDetail />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route exact path="/news" element={<Newspage />} />
        <Route exact path="/project/:id" element={<Detail />} />
        {/* <Route exact path="/Poolpage" element={<Poolpage />} /> */}
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
