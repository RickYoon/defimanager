import Styled from 'styled-components';

export const Topdash = Styled.div`

    display: flex;
    flex-direction: column;

    border: 0px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
      color: #316395;
    }

    @media screen and (max-width: 500px){
        width: 100%;
    }
`

export const UpperColumn = Styled.div`
    width: 90%;
    font-family: "OpenSans-Medium";
    font-size: 14px;
    margin:15px;
`
