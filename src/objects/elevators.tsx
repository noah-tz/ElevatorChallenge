import React from 'react';
import * as Stiles from '../stylesFiles/elevators.styles.ts';
import settings from '../settings.ts';
const elevatorImage = require('./elv.png');


interface propsElevator{
    elevatorNumber: number
}
interface StateElevator {
    height: number;
}
class Elevator extends React.Component<propsElevator, StateElevator>{
    revers: number = 1;
    orders: number[] = [];
    timerWaiting: number = 0;
    isMoved: boolean = false;

    constructor(props: propsElevator){
        super(props);
        this.state = {
            height: 0
        }
        // this.moveToFloor(2)
    }

    addOrder(numberFloor: number): void{
        this.orders.push(numberFloor);
        this.setState({height: 500});
            console.log('aaammm', this.state.height);
    }

    private moveToFloor(numberFloor: number): void {
        const heightFloor = numberFloor * 117;
        const distanceToMove = heightFloor - this.state.height;
        const framesCount = Math.abs(distanceToMove / 234);
    
        const animationInterval = setInterval(() => {
            if (this.state.height === heightFloor) {
                clearInterval(animationInterval);
            } else {
                const step = distanceToMove / framesCount;
                this.setState(prevState => ({
                    height: prevState.height + step
                }));
            }
        }, 1000 / framesCount);
    }

    private movElevator(): void{
        if (!this.isMoved) {
            this.isMoved = true;
            while (this.orders) {
                this.moveToFloor(this.orders[0]);
            }            
        }
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
        let elevatorFaster = '1';
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