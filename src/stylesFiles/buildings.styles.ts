import styled from "styled-components"
import settings from "../settings.ts"

export const Floors = styled.div`
    display: flex;
    flex-direction: column-reverse;
`

export const Buildings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    border: 2px;
`

export const Building = styled.div`
    min-height: ${settings.minHeightBuilding};
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`
