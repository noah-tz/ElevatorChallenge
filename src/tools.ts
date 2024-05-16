import settings from './settings.ts';

// The Timer class represents a timer with the ability to know how much time is left
export class Timer {
  private timerLength: number;
  private startTime: number;
  

  startTimer(seconds: number): void{
    this.timerLength = seconds * 1000;
    this.startTime = Date.now();
  }

  getSecondsLeft(): number{
    const timePassed: number = Date.now() - this.startTime;
    const timeLeft: number = this.timerLength - timePassed;
    return this.timerLength? Math.max(timeLeft / 1000, 0): 0;
  }
}

export const roundToNearestHalf = (number: number): number => {
  const integerPart: number = Math.floor(number);
  const fractionalPart: number = number - integerPart;

  if (fractionalPart < 0.25) {
    return integerPart;
  } else if (fractionalPart > 0.75) {
    return integerPart + 1;
  } else {
    return integerPart + 0.5;
  }
}

// Displays the elevator travel time between two given floors
export const getSecondsForSingleOrder = (previousFloor: number, newFloor: number): number => {
  return Math.abs(previousFloor - newFloor) / settings.floorsPerSecond;
}

export const sleep = (delay: number): Promise<null> => new Promise((resolve) => setTimeout(resolve, delay *1000))