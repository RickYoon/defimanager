import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import opensansSemibold from 'assets/fonts/OpenSans-Semibold.woff'
import opensansLight from 'assets/fonts/OpenSans-Light.woff'
import opensansMedium from 'assets/fonts/OpenSans-Medium.woff'



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
        font-family: 'OpenSans-Medium', 'SpoqaHanSansNeo-Regular';
        background: #e9ecef;
        min-height: 100vh;
    }

    html, body {
        max-width: 100%;
        min-height: 100vh;
    }

    @font-face {
        font-family: 'OpenSans-Semibold';
        src: local('OpenSans-Semibold'),url(${opensansSemibold}) format('woff');
        unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
    }
    @font-face {
    font-family: 'OpenSans-Light';
    src: local('OpenSans-Light'),url(${opensansLight}) format('woff');
    unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
    }
    @font-face {
    font-family: 'OpenSans-Medium';
    src: local('OpenSans-Medium'),url(${opensansMedium}) format('woff');
    unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
    }
    @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: local('SpoqaHanSansNeo-Regular'),url(${opensansMedium}) format('woff');
    unicode-range:U+AC00-U+D7A3;
    }
`;

export default GlobalStyles;
