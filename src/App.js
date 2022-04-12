import React from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import Topnav from './components/layout/Topnav';
import Sidenav from './components/layout/Sidenav';
import AccountOverview from './components/dashboard/AccountOverview';
import TopLogo from './components/layout/TopLogo';
import TopLogoWallet from './components/layout/TopLogoWallet';
import Footer from './components/layout/Footer';
import Mainpage from './components/pages/Mainpage'
import Detailpage from './components/pages/Detailpage'
import Newspage from './components/pages/Newspage'
// import Eventpage from './components/pages/Eventpage'
import Faqpage from './components/pages/Faqpage'
import Walletpages from './components/pages/WalletPages'
import Defimananger from './components/pages/Defimanager'
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
        <Route exact path="/dashboard" element={<Sidenav />} />
        <Route exact path="/news" element={<Topnav />} />
        <Route exact path="/faq" element={<Topnav />} />
        <Route exact path="/project/:id" element={<Topnav />} />
        <Route exact path="/event" element={<Topnav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route exact path="/dashboard" element={<AccountOverview />} />
        <Route exact path="/news" element={<Newspage />} />
        <Route exact path="/faq" element={<Faqpage />} />
        <Route exact path="/project/:id" element={<Detailpage />} />
        <Route exact path="/wallet" element={<Walletpages />} />
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
