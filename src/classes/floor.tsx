import React from 'react';
import * as Styles from '../stylesFiles/floors.style.ts';
import settings from '../settings.ts';
import DisplayTimer from './orderTimer.tsx';
import Elevators from './elevators.tsx';

interface propsFloor {
    floorNumber: number,
    buildingNumber: number,
    orderElevator: () => number,
}
class Floor extends React.Component<propsFloor> {
    private timer: DisplayTimer = new DisplayTimer({
        buildingNumber: this.props.buildingNumber,
        floorNumber: this.props.floorNumber
    });
    
    handelClick() : void {
        const seconds: number = this.props.orderElevator();
        if (
            document.getElementById(`timerOFBuildingNumber ${this.props.buildingNumber} floorNumber ${this.props.floorNumber}`)!.innerText === '' &&
            seconds > 0
        ) {
            this.timer.start(seconds);
        }
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



class FloorFactory {
    private static createFloorComponent(
        buildingNumber: number,
        floorNumber: number,
        elevators: Elevators,
    ): React.ReactNode {
        return(
            <Floor
                buildingNumber={buildingNumber}
                floorNumber={floorNumber}
                orderElevator={ () => elevators.orderFasterElevator(floorNumber)} />
        );
    }

    static createFloors(
        buildingNumber: number,
        elevators: Elevators,
    ): React.ReactNode {
        return (
            <Styles.Floors>
                {Array(settings.numOfFloors).fill(null).map((_, idx) => (
                    FloorFactory.createFloorComponent(buildingNumber, idx + 1, elevators)
                ))}
            </Styles.Floors>
        );
    }
}

export default FloorFactory;