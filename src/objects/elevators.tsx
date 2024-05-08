import React from 'react';
import * as Stiles from '../stylesFiles/styles.ts';
import settings from '../settings.ts';
import elevatorImage from './elv.png'

class Elevators extends React.Component {
    render() {
        const pathImage: string = './elv.png'
        return(
            <Stiles.Elevators>
                {Array(settings.numOfElevators).fill(null).map((_, idx) => (
                    <Stiles.Elevator src={elevatorImage} alt={`Elevator number ${idx +1}`}/>
                ))}
            </Stiles.Elevators>
        )
    }
}

export default Elevators;