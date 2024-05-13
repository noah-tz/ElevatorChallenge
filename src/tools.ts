

export class Timer {
    private timerLength: number;
    private startTime: number;

    constructor(seconds: number){
        this.timerLength = seconds * 1000;
    }

    startTimer(): void{
        this.startTime = Date.now();
    }

    getSecondsLeft(): number{
        const timePassed = Date.now() - this.startTime;
        const timeLeft = this.timerLength - timePassed;
        return Math.max(timeLeft / 1000, 0);
    }
}

export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay *1000))