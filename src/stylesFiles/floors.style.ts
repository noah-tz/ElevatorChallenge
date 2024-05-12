import styled from "styled-components"





export const Floor = styled.div<{isLastFloor: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: silver;
    background-image: linear-gradient(335deg, #b00 23px, transparent 23px), 
                      linear-gradient(155deg, #d00 23px, transparent 23px), 
                      linear-gradient(335deg, #b00 23px, transparent 23px), 
                      linear-gradient(155deg, #d00 23px, transparent 23px);
    background-size: 58px 58px;
    background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
    width: 300px;
    height: 110px;
    text-align: center;
    border-top: ${props => props.isLastFloor? '7px  solid black': 'none'};
`

export const metalLinear = styled.button<{isOrdered: boolean}>`
    width: 70px;
    height: 50px;
    font-size: 2em;
    border-radius: .5em;
    background-image: -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 6%, hsla(0,0%,100%, .1) 7.5%), 
    -webkit-repeating-linear-gradient(left, hsla(0,0%, 0%,0) 0%, hsla(0,0%, 0%,0) 4%, hsla(0,0%, 0%,.03) 4.5%), 
    -webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%), 
    linear-gradient(180deg, hsl(0,0%,78%) 0%, hsl(0,0%,90%) 47%, hsl(0,0%,78%) 53%, hsl(0,0%,70%)100%);
    color: ${props => props.isOrdered? 'green': 'none'};
`
