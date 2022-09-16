import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from './assets/styles/GlobalStyles';
import ScrollToTop from 'util/ScrollTop';

// import Topnav from './components/layout/Topnav';
// import Poolpage from 'components/pages/Poolpage';
import Topnav from './layout/Topnav';
import Projectfooter from "./layout/Projectfooter"

import TopnavDetail from './layout/TopnavDetail'
import Footer from './components/layout/Footer';
import Newspage from './components/pages/Newspage'

import Overview from './pages/overview/Overview'
import Detail from './pages/detail/Detail'
import Poolsearch from './pages/poolsearch'

import Nftoverview from 'pages/nftOverview/Overview';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Topnav />} />
        <Route exact path="/nftview" element={<Topnav />} />
        <Route exact path="/Poolpage" element={<Topnav />} />
        <Route exact path="/news" element={<Topnav />} />
        <Route exact path="/project/:id" element={<TopnavDetail />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route exact path="/nftview" element={<Nftoverview />} />
        <Route exact path="/news" element={<Newspage />} />
        <Route exact path="/project/:id" element={<Detail />} />
        <Route exact path="/Poolpage" element={<Poolsearch />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Footer />} />
        <Route exact path="/nftview" element={<Footer />} />
        <Route exact path="/news" element={<Footer />} />
        <Route exact path="/project/:id" element={<Footer />} />
        <Route exact path="/Poolpage" element={<Projectfooter />} />
      </Routes>
    </Router>
  );
}

export default App;
