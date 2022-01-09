import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import myFont from 'assets/fonts/cookie-regular-webfont.woff'

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
        
    }    
    body {
        font-family: 'cookie-regular-webfont';
    }
    @font-face {
    font-family: 'cookie-regular-webfont';
    src: local('cookie-regular-webfont'),url(${myFont}) format('woff');
    }
`;

export default GlobalStyles;