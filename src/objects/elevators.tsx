import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
import {Timer, sleep} from '../tools.ts' 

const audio: string = require('../media/ding.mp3')
const elevatorImage: string = require('../media/elv.png');


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
    timerWaiting = new Timer();
    isMoved: boolean = false;
    currentFloor: number = 1;
    height: number = 0;
    keyElevator: string = `buildingNumber ${this.props.buildingNumber} elevatorNumber ${this.props.elevatorNumber}`;

    constructor(props: any){
        super(props);
    }

    addOrder(floorNumber: number): void{
        // console.log(this.orders)
        this.orders.push(floorNumber);
        // console.log(this.orders)
        const buttonElement: HTMLElement = document.getElementById(`ButtonOfBuildingNumber ${this.props.buildingNumber} floorNumber ${floorNumber}`)!;
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
            const buttonElement = document.getElementById(`ButtonOfBuildingNumber ${this.props.buildingNumber} floorNumber ${floorNumber}`);
            buttonElement!.style.color = 'black';
            await sleep(2);
            if (this.orders.length > 0) {
                this.moveToNextFloor(this.orders[0]);        
            }
        }, standbySeconds * 1000);
    }
    
   
    getSecondsOrder(newOrder: number): number{
        function getSecondsForSingleOrder(previousFloor: number, newFloor: number): number{
            return Math.abs(previousFloor - newFloor) / settings.floorsPerSecond;
        }
        if(!this.orders.length){
            return getSecondsForSingleOrder(this.currentFloor, newOrder) + this.timerWaiting.getSecondsLeft();
        }
        const secondsBeforeList: number = getSecondsForSingleOrder(this.currentFloor, this.orders[0]) + this.timerWaiting.getSecondsLeft();
        let secondsList: number = 0;
        for (let idxOrder = 1; idxOrder < this.orders.length; idxOrder++){
            secondsList += getSecondsForSingleOrder(this.orders[idxOrder -1], this.orders[idxOrder]) +2;
        }
        const secondsLastOrder: number = getSecondsForSingleOrder(this.orders[this.orders.length -1], newOrder) +2;
        console.log('aaabbb',secondsBeforeList, secondsList, secondsLastOrder, this.orders, newOrder, this.timerWaiting.getSecondsLeft());
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

interface elevatorProps {
    buildingNumber: number
}
class Elevators extends React.Component<elevatorProps> {
    elevators: Record<number, Elevator> = {};

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

export default Elevators;