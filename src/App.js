import React from 'react';
// import RouteChangeTracker from './RouteChangeTracker';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import GlobalStyles from './assets/styles/GlobalStyles';
import ScrollToTop from 'util/ScrollTop';

// import Topnav from './components/layout/Topnav';
// import Poolpage from 'components/pages/Poolpage';
import Topnav from './layout/Topnav';
import TopnavNftDetail from 'layout/TopnavNftDetail';
// import TopnavNFT from 'layout/TopnavNFT';

import Projectfooter from "./layout/Projectfooter"

import TopnavDetail from './layout/TopnavDetail'
import Footer from './components/layout/Footer';
import Newspage from './components/pages/Newspage'

import Overview from './pages/overview/Overview'
import KlaytnOverview from "./pages/klaytnOverview/Overview"
import Detail from './pages/detail/Detail'
import Poolsearch from './pages/poolsearch'
import Wallet from './pages/wallet'


import NftDetail from './pages/nftDetail/NftDetail'

import Nftoverview from 'pages/nftOverview/Overview';
import Sidenav from 'components/layout/Sidenav'
import Nav from 'layout/nav'

import Main from 'pages/analytics/Main'
import Lending from 'pages/lending'
import Bot from 'pages/bot'
import Staking from 'pages/staking'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Routes>
        <Route path="/wallet" element={<Nav />} />
        <Route path="/Bot" element={<Nav />} />
        <Route exact path="/Poolpage" element={<Nav />} />
        <Route exact path="/Staking" element={<Nav />} />


        <Route path="/projects" element={<Nav />} />
        <Route exact path="/wallet/:id" element={<Nav />} />
        <Route exact path="/project/:id" element={<Nav />} />
        <Route exact path="/nftview" element={<Nav />} />
        <Route exact path="/analytics" element={<Nav />} />
        <Route exact path="/nftview/:id" element={<TopnavNftDetail />} />
        <Route exact path="/news" element={<Topnav />} />
      </Routes>
      <Routes>
        <Route exact path="/" element={<Lending />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route exact path="/Bot" element={<Bot />} />
        <Route exact path="/Poolpage" element={<Poolsearch />} />
        <Route exact path="/Staking" element={<Staking />} />


        <Route path="/projects" element={<Overview />} />
        <Route path="/klaytn" element={<KlaytnOverview />} />
        <Route exact path="/wallet/:id" element={<Wallet />} />
        <Route exact path="/project/:id" element={<Detail />} />
        <Route exact path="/nftview" element={<Nftoverview />} />
        <Route exact path="/nftview/:id" element={<NftDetail />} />
        <Route exact path="/analytics" element={<Main />} />
        <Route exact path="/news" element={<Newspage />} />
      </Routes>
    </Router>
  );
}

export default App;
