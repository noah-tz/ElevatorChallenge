import React from 'react';
import * as Styles from '../stylesFiles/floors.styles.ts';
import settings from '../settings.ts';
import Elevators from './elevators.tsx';

interface propsFloor {
    numberFloor: number,
    // addOrder: () => number
    elevators:  Elevators
}
class Floor extends React.Component<propsFloor> {
    height: number = (this.props.numberFloor) * 117;
    timer: NodeJS.Timeout | null = null;

    private setTimer(seconds: number): void {
        if (seconds > 0) {
            this.timer = setTimeout(() => {
                this.timer = null;
                this.forceUpdate();
            }, seconds * 1000);
        }
    }

    handelClick() : void {
        // this.setTimer(this.props.addOrder()));
        this.setTimer(this.props.elevators.findFasterElevator(this.props.numberFloor));
    }
    render(): React.ReactNode {
        return(
            <Styles.Floor isLastFloor={this.props.numberFloor < settings.numOfFloors}>
                <Styles.metalLinear
                    onClick={() => this.handelClick()}
                    isOrdered={Boolean(this.timer)}
                >
                    {this.props.numberFloor}
                </Styles.metalLinear>
            </Styles.Floor>
        )
    }
}

interface propsFloors {
    // addOrder: (numberFloor: number) => number
    elevators:  Elevators
}
class Floors extends React.Component<propsFloors> {
    render() {
        return (
            <Styles.Floors>
                {Array(settings.numOfFloors).fill(null).map((_, idx) => (
                    // <Floor numberFloor={idx +1} addOrder={() => this.props.addOrder(idx +1)}></Floor>
                    <Floor numberFloor={idx +1} elevators={this.props.elevators} key={idx +1}></Floor>
                ))}
            </Styles.Floors>
        )
    }
}




export default Floors