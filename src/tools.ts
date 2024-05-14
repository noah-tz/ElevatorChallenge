

export class Timer {
    private timerLength: number;
    private startTime: number;
    
    startTimer(seconds: number): void{
        this.timerLength = seconds * 1000;
        this.startTime = Date.now();
    }

    getSecondsLeft(): number{
        const timePassed = Date.now() - this.startTime;
        const timeLeft = this.timerLength - timePassed;
        return this.timerLength? Math.max(timeLeft / 1000, 0): 0;
    }
}

export const roundToNearestHalf = (number: number): number => {
    const integerPart = Math.floor(number);
    const fractionalPart = number - integerPart;

    if (fractionalPart < 0.25) {
      return integerPart;
    } else if (fractionalPart > 0.75) {
      return integerPart + 1;
    } else {
      return integerPart + 0.5;
    }
  }

export const sleep = (delay: number): Promise<null> => new Promise((resolve) => setTimeout(resolve, delay *1000))