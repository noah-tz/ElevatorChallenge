import React from 'react';
import Floors from './floors.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/styles.ts'

import settings from '../settings.ts';

interface Props {
    numOfBuildings: number
}
interface State {
    numOfBuildings: number
}

class Buildings extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
        this.setState({numOfBuildings: this.props.numOfBuildings});
    }
    render() {
        return (
            <Styles.Buildings>
                {Array(2).fill(null).map((_, idx) => (
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
