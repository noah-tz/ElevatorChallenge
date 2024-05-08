import React from 'react';
import Floors from './floors.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'

import settings from '../settings.ts';

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
    render() {
        return (
            <Styles.Building>
                <Floors/>
                <Elevators/>
            </Styles.Building>
        )
    }
}

export default Buildings;
