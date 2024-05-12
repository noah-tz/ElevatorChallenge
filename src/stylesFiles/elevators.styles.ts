import styled from "styled-components";
import settings from "../settings.ts";



export const Elevators = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
`

export const Elevator = styled.img<{height: number}>`
    width: 110px;
    height: 110px;
    margin-bottom: ${props=> props.height}px;
`

