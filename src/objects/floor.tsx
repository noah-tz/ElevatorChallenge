import React from 'react';
import * as Styles from '../stylesFiles/floors.style.ts';
import settings from '../settings.ts';
import DisplayTimer from './orderTimer.tsx';

interface propsFloor {
    floorNumber: number,
    buildingNumber: number,
    orderElevator: () => number,
}
class Floor extends React.Component<propsFloor> {
    height: number = (this.props.floorNumber) * 117;
    timer: DisplayTimer = new DisplayTimer({
        buildingNumber: this.props.buildingNumber,
        floorNumber: this.props.floorNumber
    });

    private setTimer(seconds: number): void {
        if (seconds > 0) {
            this.timer.start(seconds);
        }
    }

    handelClick() : void {
        this.setTimer(this.props.orderElevator());
    }
    render(): React.ReactNode {
        return(
            <Styles.Floor
                isLastFloor={this.props.floorNumber < settings.numOfFloors}
                >
                <Styles.metalLinear
                    onClick={() => this.handelClick()}
                    id={`ButtonOfBuildingNumber ${this.props.buildingNumber} floorNumber ${this.props.floorNumber}`}
                >
                    {this.props.floorNumber}
                </Styles.metalLinear>
                {this.timer.render()}
            </Styles.Floor>
        )
    }
}

export default Floor