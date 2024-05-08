import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
import elevatorImage from './elv.png'

interface propsElevator{
    elevatorNumber: number
}
class Elevator extends React.Component<propsElevator>{
    revers: boolean
    height: number
    render(): React.ReactNode {
        return(
            <Stiles.Elevator src={elevatorImage} alt={`Elevator number ${this.props.elevatorNumber}`}/>
        )
    }
}

class Elevators extends React.Component {
    render() {
        const pathImage: string = './elv.png'
        return(
            <Stiles.Elevators>
                {Array(settings.numOfElevators).fill(null).map((_, idx) => (
                    <Elevator elevatorNumber={idx +1}/>
                ))}
            </Stiles.Elevators>
        )
    }
}

export default Elevators;