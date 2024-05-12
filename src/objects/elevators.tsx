import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
import elevatorImage from './elv.png'
// import elevatorImage from '../../images/elv.png'

interface propsElevator{
    elevatorNumber: number
}
interface StateElevator {
    height: number;
}
class Elevator extends React.Component<propsElevator, StateElevator>{
    revers: boolean = false;
    orders: number[] = [];
    timerWaiting: number = 0;

    constructor(props: propsElevator){
        super(props);
        this.state = {
            height: 0
        }
    }

    addOrder(numberFloor: number): void{
        this.orders.push(numberFloor);
    }
    
    getSecondsOrder(newOrder: number): number{
        function getSecondsForSingleOrder(previousLocation: number, newOrder: number): number{
            return Math.abs(previousLocation - newOrder * 117) / 117 * 0.5;
        }
        if(!this.orders){
            return getSecondsForSingleOrder(this.state.height, newOrder) + this.timerWaiting;
        }
        let seconds = getSecondsForSingleOrder(this.state.height, this.orders[0]) + this.timerWaiting +2;
        for (let idxOrder = 1; idxOrder < this.orders.length; idxOrder++){
            seconds += getSecondsForSingleOrder(this.orders[idxOrder -1] *117, this.orders[idxOrder]) +2;
        }
        return seconds;
    }

    render(): React.ReactNode {
        return(
            <Stiles.Elevator
                height={this.state.height}
                src={elevatorImage}
                alt={`Elevator number ${this.props.elevatorNumber}`}
            />
        )
    }
}

class Elevators extends React.Component {
    elevators: Record<number, Elevator> = {}

    constructor(props: any){
        super(props);
        this.createElevators();
    }

    createElevators(): void {
        for (let elevatorNumber = 1; elevatorNumber <= settings.numOfElevators; elevatorNumber++) {
            this.elevators[elevatorNumber] = new Elevator({elevatorNumber: elevatorNumber});
        }        
    }

    findFasterElevator(numberFloor: number): number {
        let elevatorFaster = '0';
        let timeElevatorFaster = Infinity;
        for (let elevatorNumber of Object.keys(this.elevators)){
            let timeElevator = this.elevators[Number(elevatorNumber)].getSecondsOrder(numberFloor);
            if (timeElevator < timeElevatorFaster) {
                elevatorFaster = elevatorNumber;
                timeElevatorFaster = timeElevator;
            }
        }
        this.elevators[elevatorFaster].addOrder(numberFloor);
        return Number(timeElevatorFaster);
    }

    render(): React.ReactNode {
        return(
            <>
            {Object.keys(this.elevators).map((elevatorNumber, _) => (
                this.elevators[elevatorNumber].render()
            ))}
            </>
        )
    }
}

export default Elevators;