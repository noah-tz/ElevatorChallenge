import React from 'react';
import settings from '../../settings.ts';
import { Timer, getSecondsForSingleOrder, sleep } from '../../utils.ts'
import * as Stiles from '../../stylesFiles/elevators.styles.ts';

const audio: string = require('../../media/ding.mp3')
const elevatorImage: string = require('../../media/elv.png');



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

  // adds an order to the order queue and moves the elevator (if not in motion).
    addOrder(floorNumber: number): void{
        this.orders.push(floorNumber);
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

    
    // Waits for the arrival time and the waiting time on the floor.
    // paints the button black. if there are pending orders 'moveToNextFloor'.
    private async arrivalToFloor(standbySeconds: number, floorNumber: number) {
        this.timerWaiting.startTimer(standbySeconds +2);
        setTimeout(async () => {
            const dingAudio = new Audio(audio);
            dingAudio.play();
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


export default Elevator
