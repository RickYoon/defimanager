import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ReactGA from 'react-ga';
// const TRACKING_ID =""; // 발급받은 추적ID를 환경 변수로 불러온다.
import ReactGA from 'react-ga';

// console.log();
if(window.location.hostname !== "localhost"){
    ReactGA.initialize('G-WTWX3TJM39');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();

