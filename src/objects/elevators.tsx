import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
const elevatorImage = require('./elv.png');

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay *1000))

interface propsElevator{
    buildingNumber: number;
    elevatorNumber: number;
}
interface StateElevator {
    height: number;
}
class Elevator extends React.Component<propsElevator, StateElevator>{
    revers: number = 1;
    orders: number[] = [];
    timerWaiting: number = 0;
    isMoved: boolean = false;
    currentFloor: number = 0;
    height: number = 0;

    constructor(props: propsElevator){
        super(props);
        this.state = {
            height: 0
        }
    }

    addOrder(numberFloor: number): void{
        this.orders.push(numberFloor);
        if (this.orders.length === 1) {
            this.moveToNextFloor(this.orders[0]);
        }
    }
    
    private moveToNextFloor(numberFloor: number): void {
        const element = document.getElementById(`buildingNumber ${this.props.buildingNumber} elevatorNumber ${this.props.elevatorNumber}`)
        const secondMove = Math.abs(this.currentFloor - numberFloor) / 2;
        element!.style.transition = `${secondMove}s`;
        element!.style.marginBottom = `${(numberFloor -1) * 117}px`;
        this.currentFloor = numberFloor;        
        this.arrivalToFloor(secondMove);
    }

    
    private async arrivalToFloor(standbySeconds: number) {
        setTimeout(async () => {
            // const dingAudio = new Audio('../ding.mp3');
            // dingAudio.play();
            this.orders.splice(0, 1);
            await sleep(2);
            if (this.orders.length > 0) {
                this.moveToNextFloor(this.orders[0]);        
            }
        }, standbySeconds * 1000);
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
                id={`buildingNumber ${this.props.buildingNumber} elevatorNumber ${this.props.elevatorNumber}`}
                src={elevatorImage}
                alt={`Elevator number ${this.props.elevatorNumber}`}
            />
        )
    }
}

interface elevatorProps {
    buildingNumber: number
}
class Elevators extends React.Component<elevatorProps> {
    elevators: Record<number, Elevator> = {}

    constructor(props: any){
        super(props);
        this.createElevators();
    }

    createElevators(): void {
        for (let elevatorNumber = 1; elevatorNumber <= settings.numOfElevators; elevatorNumber++) {
            this.elevators[elevatorNumber] = new Elevator({
                elevatorNumber: elevatorNumber,
                buildingNumber: this.props.buildingNumber
            });
        }        
    }

    orderFasterElevator(numberFloor: number): number {
        let elevatorFaster = '1';
        let timeElevatorFaster = Infinity;
        for (let elevatorNumber of Object.keys(this.elevators)){
            let timeElevator = this.elevators[Number(elevatorNumber)].getSecondsOrder(numberFloor);
            console.log(timeElevator, elevatorNumber)
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
            {Object.keys(this.elevators).map((elevatorNumber, idx) => (
                <div key={idx +1}>
                    {this.elevators[elevatorNumber].render()}
                </div>
            ))}
            </>
        )
    }
}

export default Elevators;