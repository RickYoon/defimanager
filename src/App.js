import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from './assets/styles/GlobalStyles';
import ScrollToTop from 'util/ScrollTop';

// import Topnav from './components/layout/Topnav';
// import Poolpage from 'components/pages/Poolpage';
import Topnav from './layout/Topnav';
import TopnavNftDetail from 'layout/TopnavNftDetail';
import TopnavNFT from 'layout/TopnavNFT';

import Projectfooter from "./layout/Projectfooter"

import TopnavDetail from './layout/TopnavDetail'
import Footer from './components/layout/Footer';
import Newspage from './components/pages/Newspage'

import Overview from './pages/overview/Overview'
import Detail from './pages/detail/Detail'
import NftDetail from './pages/nftDetail/NftDetail'
import Poolsearch from './pages/poolsearch'

import Nftoverview from 'pages/nftOverview/Overview';
import DefimanagerNew from 'components/pages/DefimanagerNew'
import Sidenav from 'components/layout/Sidenav'
import Nav from 'layout/nav'

import Main from 'pages/analytics/Main'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route exact path="/Poolpage" element={<Nav />} />
        <Route exact path="/project/:id" element={<Nav />} />
        <Route exact path="/nftview" element={<Nav />} />
        <Route exact path="/analytics" element={<Nav />} />
        <Route exact path="/nftview/:id" element={<TopnavNftDetail />} />
        <Route exact path="/news" element={<Topnav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route exact path="/Poolpage" element={<Poolsearch />} />
        <Route exact path="/project/:id" element={<Detail />} />
        <Route exact path="/nftview" element={<Nftoverview />} />
        <Route exact path="/nftview/:id" element={<NftDetail />} />
        <Route exact path="/analytics" element={<Main />} />
        <Route exact path="/news" element={<Newspage />} />
      </Routes>
      {/* <Routes> */}
        {/* <Route path="/" element={<Footer />} /> */}
        {/* <Route exact path="/nftview" element={<Footer />} />
        <Route exact path="/nftview/:id" element={<Footer />} />
        <Route exact path="/news" element={<Footer />} />
        <Route exact path="/project/:id" element={<Footer />} />
        <Route exact path="/Poolpage" element={<Projectfooter />} />
      </Routes> */}
    </Router>
  );
}

export default App;
