import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ReactGA from 'react-ga';

// console.log();
// if(window.location.hostname !== "localhost"){
    // ReactGA.initialize('G-WTWX3TJM39');
    // ReactGA.pageview(window.location.pathname + window.location.search);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();

