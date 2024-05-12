import React from 'react';
import * as Styles from '../stylesFiles/floors.style.ts';
import settings from '../settings.ts';
import Elevators from './elevators.tsx';

interface propsFloor {
    floorNumber: number,
    buildingNumber: number,
    elevators:  Elevators
}
class Floor extends React.Component<propsFloor> {
    height: number = (this.props.floorNumber) * 117;
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
        this.setTimer(this.props.elevators.orderFasterElevator(this.props.floorNumber));
    }
    render(): React.ReactNode {
        return(
            <Styles.Floor
                isLastFloor={this.props.floorNumber < settings.numOfFloors}
                >
                <Styles.metalLinear
                    onClick={() => this.handelClick()}
                    isOrdered={Boolean(this.timer)}
                    id={`ButtonOfNumberBuilding ${this.props.buildingNumber} numberFloor ${this.props.floorNumber}`}
                >
                    {this.props.floorNumber}
                </Styles.metalLinear>
            </Styles.Floor>
        )
    }
}

export default Floor