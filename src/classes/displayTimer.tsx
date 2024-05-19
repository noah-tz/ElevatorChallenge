import React from 'react';
import { Timer, roundToNearestHalf, sleep } from '../utils.ts';
import * as Style from '../stylesFiles/displayTimer.styles.ts'


// DisplayTimer class that displays the waiting time for the elevator.
// Activation using the 'start' function
interface propsTimer {
    buildingNumber: number;
    floorNumber: number;
}
class DisplayTimer extends React.Component<propsTimer>{
    private timer: Timer = new Timer();
    private decimalSecond: number;
    private timeLeft: number;
    private keySelfElement: string =
        `timerOFBuildingNumber ${this.props.buildingNumber} floorNumber ${this.props.floorNumber}`
    ;
    private selfElement: HTMLElement;

    // dictates the updated time
    private setTextTimer(text: string): void{
        if (!this.selfElement) {
            this.selfElement = document.getElementById(this.keySelfElement)!;
        }
        this.selfElement.innerText = text;
    }

    // Starts the timer display
    start(seconds: number): void {
        this.decimalSecond = seconds - Math.floor(seconds);
        this.timeLeft = seconds;
        this.timer.startTimer(seconds);
        this.reduceDecimalSeconds();
    }

    // Reduces the decimal part in seconds
    private reduceDecimalSeconds(): void {
        this.setTextTimer(roundToNearestHalf(this.timeLeft).toString());
        setTimeout(
            () => {
                this.timeLeft = this.timer.getSecondsLeft();
                this.setTextTimer(roundToNearestHalf(this.timeLeft).toString());
                this.reduceWholeSeconds();
            },
            this.decimalSecond * 1000
        );
    }

    // Subtracts the seconds part (one by one, without the decimal part)
    private reduceWholeSeconds(): void {
        const intervalId: NodeJS.Timeout = setInterval(async () => {
            this.timeLeft = this.timer.getSecondsLeft();
            this.setTextTimer(roundToNearestHalf(this.timeLeft).toString());
            if (this.timeLeft <= 0.1) {
                this.setTextTimer('0');
                await sleep(0.5)
                this.setTextTimer('');
                clearInterval(intervalId);
        }
        }, 1000);
    }

    render(): React.ReactNode {
        return(
            <Style.timerScreen id={this.keySelfElement}/>
        )
    }
}

export default DisplayTimer;