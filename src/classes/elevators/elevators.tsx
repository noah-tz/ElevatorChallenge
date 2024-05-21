import React from 'react';
import Elevator from './elevator.tsx';




// Class 'Elevators' represents a system of elevators (of one building)
interface elevatorsSystemProps {
    buildingNumber: number;
    numberOfElevators: number;
}
class ElevatorsSystem extends React.Component<elevatorsSystemProps> {
    private elevators: Record<number, Elevator> = {};

    constructor(props: any){
        super(props);
        this.createElevators();
    }

    createElevators(): void {
        for (let elevatorNumber: number = 1; elevatorNumber <= this.props.numberOfElevators; elevatorNumber++) {
            this.elevators[elevatorNumber] = new Elevator({
                elevatorNumber: elevatorNumber,
                buildingNumber: this.props.buildingNumber
            });
        }
    }

    // Finds the fast elevator in the building and orders it
    orderFasterElevator(numberFloor: number): number {
        let elevatorFaster: string = '1';
        let timeElevatorFaster: number = Infinity;
        for (let elevatorNumber of Object.keys(this.elevators)){
            let timeElevator: number = this.elevators[Number(elevatorNumber)].getSecondsOrder(numberFloor);
            if (timeElevator < timeElevatorFaster) {
                elevatorFaster = elevatorNumber;
                timeElevatorFaster = timeElevator;
            }
        }
        this.elevators[elevatorFaster].addOrder(numberFloor);
        return timeElevatorFaster;
    }

    render(): React.ReactNode {
        return(
            <>
            {Object.keys(this.elevators).map((elevatorNumber, idx) => (
                <div key={idx +1}>
                    {this.elevators[elevatorNumber].render()}
                </div>
            ))}
            </>
        )
    }
}



export default ElevatorsSystem;