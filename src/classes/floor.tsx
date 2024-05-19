import React from 'react';
import * as Styles from '../stylesFiles/floors.style.ts';
import DisplayTimer from './displayTimer.tsx';
import ElevatorsSystem from './elevators.tsx';

// Class 'Floor' representing each floor in building
interface propsFloor {
    floorNumber: number,
    isLastFloor: boolean,
    buildingNumber: number,
    orderElevator: () => number,
}
class Floor extends React.Component<propsFloor> {
    private timer: DisplayTimer = new DisplayTimer({
        buildingNumber: this.props.buildingNumber,
        floorNumber: this.props.floorNumber
    });
    private keyTimer =
        `timerOFBuildingNumber ${this.props.buildingNumber} floorNumber ${this.props.floorNumber}`
    ;
    
    // Handles the elevator booking
    handelClick() : void {
        if (
            document.getElementById(this.keyTimer)!.innerText === ''
        ) {
            const seconds: number = this.props.orderElevator();
            if (seconds > 0) {
                this.timer.start(seconds);                
            }
        }
    }

    render(): React.ReactNode {
        return(
            <Styles.Floor
                isLastFloor={this.props.isLastFloor}
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



// Produces multiple floors upon request.
// The use is through the function 'createFloors' (static function)
class FloorFactory {
    private static createFloorComponent(
        buildingNumber: number,
        floorNumber: number,
        isLastFloor: boolean,
        elevators: ElevatorsSystem,
    ): React.ReactNode {
        return(
            <Floor
                buildingNumber={buildingNumber}
                floorNumber={floorNumber}
                isLastFloor={isLastFloor}
                orderElevator={ () => elevators.orderFasterElevator(floorNumber)}
            />
        );
    }

    static createFloors(
        buildingNumber: number,
        numberOfFloors: number,
        elevators: ElevatorsSystem,
    ): React.ReactNode {
        return (
            <Styles.Floors>
                {Array(numberOfFloors).fill(null).map((_, idx) => (
                    FloorFactory.createFloorComponent(
                        buildingNumber,
                        idx + 1,
                        numberOfFloors !== idx+1,
                        elevators
                    )
                ))}
            </Styles.Floors>
        );
    }
}

export default FloorFactory;