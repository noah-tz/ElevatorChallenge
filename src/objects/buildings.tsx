import React from 'react';
import Floors from './floors.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


class Buildings extends React.Component {
    render() {
        return (
            <Styles.Buildings>
                {Array(settings.numOfBuildings).fill(null).map((_, idx) => (
                    <Building key={idx +1}/>
                ))}
            </Styles.Buildings>
        )
    }
}

class Building extends React.Component {
    elevators = new Elevators({});
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
