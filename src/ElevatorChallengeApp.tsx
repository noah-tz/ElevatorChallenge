import React, { useState } from 'react';
import * as Styles from './stylesFiles/elevators.styles.ts'
import Buildings from './objects/buildings.tsx';

function ElevatorChallenge() {
  const [numOfBuildings, setNumOfBuildings] = useState<number>(1)
  return (
    <>
      <button onClick={() => {setNumOfBuildings(numOfBuildings > 1 ? numOfBuildings-1 : numOfBuildings)}}>-</button>
      <input type="text" value={numOfBuildings} readOnly />
      <button onClick={() => {setNumOfBuildings(numOfBuildings +1)}}>+</button>
      <Buildings numOfBuildings={numOfBuildings} />
    </>
  );
}

export default ElevatorChallenge;
