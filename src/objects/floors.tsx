import React from 'react';
import * as Stiles from '../stylesFiles/styles.ts';
import settings from '../settings.ts';

interface Props {
    numberFloor: number
}

class Floors extends React.Component {
    render() {
        return (
            <Stiles.Floors>
                {Array(settings.numOfFloors).fill(null).map((_, idx) => (
                    <Stiles.Floor isLastFloor={idx < settings.numOfFloors -1}>
                        <Stiles.metalLinear isOrdered={false}>{idx +1}</Stiles.metalLinear>
                    </Stiles.Floor>
                ))}
            </Stiles.Floors>
        )
    }
}




export default Floors