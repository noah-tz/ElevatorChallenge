import React from 'react';
import Floors from './floors.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'


interface Props {
    numOfBuildings: number
}
interface State {
    numOfBuildings: number
}

class Buildings extends React.Component<Props, State> {
    render() {
        return (
            <Styles.Buildings>
                {Array(this.props.numOfBuildings).fill(null).map(() => (
                    <Building/>
                ))}
            </Styles.Buildings>
        )
    }
}

class Building extends React.Component {
    elevators = new Elevators({});
    // floors = new Floors({ addOrder: this.elevators.findFasterElevator });
    floors = new Floors({ elevators: this.elevators });

    render() {
        return (
            <Styles.Building>
                {this.floors.render()}
                {this.elevators.render()}
            </Styles.Building>
        )
    }
}

export default Buildings;
