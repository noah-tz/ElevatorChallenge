import React from 'react';
import * as Styles from '../stylesFiles/styles.ts';
import settings from '../settings.ts';

interface propsFloor {
    numberFloor: number
}
class Floor extends React.Component<propsFloor> {
    isOrdered: boolean = false;
    render(): React.ReactNode {
        return(
            <Styles.Floor isLastFloor={this.props.numberFloor < settings.numOfFloors}>
                <Styles.metalLinear isOrdered={this.isOrdered}>{this.props.numberFloor }</Styles.metalLinear>
            </Styles.Floor>
        )
    }
}

class Floors extends React.Component {
    render() {
        return (
            <Styles.Floors>
                {Array(settings.numOfFloors).fill(null).map((_, idx) => (
                    <Floor numberFloor={idx +1}></Floor>
                ))}
            </Styles.Floors>
        )
    }
}




export default Floors