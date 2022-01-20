import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import myFont from 'assets/fonts/OpenSans-Semibold.woff'

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
        font-family: 'OpenSans-Semibold';
        background: #e9ecef;
    }
    @font-face {
    font-family: 'OpenSans-Semibold';
    src: local('OpenSans-Semibold'),url(${myFont}) format('woff');
    }
`;

export default GlobalStyles;
