import React from 'react';
import { Timer, roundToNearestHalf, sleep } from '../tools.ts';
import * as Style from '../stylesFiles/orderTimer.styles.ts'


interface propsTimer {
    buildingNumber: number;
    floorNumber: number;
}
interface stateTimer {
    timeLeft: number;
}
class DisplayTimer extends React.Component<propsTimer, stateTimer>{
    timer: Timer;
    decimalSecond: number;
    timeLeft: number;
    keySelfElement: string = `timerOFBuildingNumber ${this.props.buildingNumber} floorNumber ${this.props.floorNumber}`;
    selfElement: HTMLElement;

    private setTextTimer(text: string): void{
        if (!this.selfElement) {
            this.selfElement = document.getElementById(this.keySelfElement)!;
        }
        this.selfElement.innerText = text;
    }

    start(seconds: number): void {
        this.decimalSecond = seconds - Math.floor(seconds);
        this.timeLeft = seconds;
        this.timer = new Timer(seconds);
        this.timer.startTimer();
        this.reduceDecimalSeconds();
    }

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

    private reduceWholeSeconds(): void {
        const intervalId = setInterval(async () => {
            const secondsLeft: number = this.timer.getSecondsLeft();
            this.timeLeft = this.timer.getSecondsLeft();
            this.setTextTimer(roundToNearestHalf(this.timeLeft).toString());
            if (secondsLeft <= 0.1) {
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