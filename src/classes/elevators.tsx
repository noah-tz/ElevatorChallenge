import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
import { Timer, getSecondsForSingleOrder, sleep } from '../utils.ts' 

const audio: string = require('../media/ding.mp3')
const elevatorImage: string = require('../media/elv.png');

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



// Class Elevator' elevator performance (one)
interface propsElevator{
    buildingNumber: number;
    elevatorNumber: number;
}
class Elevator extends React.Component<propsElevator>{
    private orders: number[] = [];
    private timerWaiting = new Timer();
    private currentFloor: number = 1;
    private keyElevator: string = 
        `buildingNumber ${this.props.buildingNumber} elevatorNumber ${this.props.elevatorNumber}`
    ;

    // Adds an order to the order queue
    addOrder(floorNumber: number): void{
        this.orders.push(floorNumber);
        const buttonElement: HTMLElement = document.getElementById(
            `ButtonOfBuildingNumber ${this.props.buildingNumber} floorNumber ${floorNumber}`
        )!;
        buttonElement.style.color = 'green';
        if (
            this.orders.length === 1 &&
            !this.timerWaiting.getSecondsLeft()
        ) {
            this.moveToNextFloor(this.orders[0]);
        }
    }
    
    private moveToNextFloor(floorNumber: number): void {
        const elevatorElement: HTMLElement = document.getElementById(this.keyElevator)!
        const secondMove: number = Math.abs(this.currentFloor - floorNumber) / settings.floorsPerSecond;
        elevatorElement.style.transition = `${secondMove}s`;
        elevatorElement.style.marginBottom = `${(floorNumber -1) * settings.floorHeight}px`;
        this.currentFloor = floorNumber;
        this.orders.splice(0, 1);
        this.arrivalToFloor(secondMove, floorNumber);
    }

    
    private async arrivalToFloor(standbySeconds: number, floorNumber: number) {
        this.timerWaiting.startTimer(standbySeconds +2);
        setTimeout(async () => {
            const dingAudio = new Audio(audio);
            dingAudio.play();
            const buttonElement: HTMLElement = document.getElementById(
                `ButtonOfBuildingNumber ${this.props.buildingNumber} floorNumber ${floorNumber}`
            )!;
            buttonElement.style.color = 'black';
            await sleep(2);
            if (this.orders.length) {
                this.moveToNextFloor(this.orders[0]);        
            }
        }, standbySeconds * 1000);
    }
    
    // Returns the given time for the elevator to arrive for a requested order
    // (taking into account previous orders)
    getSecondsOrder(newOrder: number): number{
        if(!this.orders.length){
            return getSecondsForSingleOrder(this.currentFloor, newOrder) + this.timerWaiting.getSecondsLeft();
        }
        const secondsBeforeList: number = getSecondsForSingleOrder(this.currentFloor, this.orders[0]) + this.timerWaiting.getSecondsLeft();
        let secondsList: number = 0;
        for (let idxOrder: number = 1; idxOrder < this.orders.length; idxOrder++){
            secondsList += getSecondsForSingleOrder(this.orders[idxOrder -1], this.orders[idxOrder]) +2;
        }
        const secondsLastOrder: number = getSecondsForSingleOrder(this.orders[this.orders.length -1], newOrder) +2;
        return secondsBeforeList + secondsList + secondsLastOrder;
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

export default ElevatorsSystem;