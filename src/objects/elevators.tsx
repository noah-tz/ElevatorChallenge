import React from 'react';
import * as Stiles from '../stylesFiles/styles.ts';
import settings from '../settings.ts';
import elv from './elv.png'

class Elevators extends React.Component {
    render() {
        // const pathImage: string = '../../images/elv.png'
        const pathImage: string = './elv.png'
        return(
            <Stiles.Elevators>
                {Array(settings.numOfElevators).fill(null).map((_, idx) => (
                    <Stiles.Elevator src={elv} alt={`Elevator number ${idx +1}`}/>
                    // <img src={elv} height={200} width={200} alt={`Elevator number ${idx +1}`}/>
                ))}
            </Stiles.Elevators>
        )
    }
}

export default Elevators;