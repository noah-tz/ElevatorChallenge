import React, { useState } from 'react';
import * as Styles from './stylesFiles/elevators.styles.ts'
import Buildings from './objects/buildings.tsx';

function ElevatorChallenge() {
  const [numOfBuildings, setNumOfBuildings] = useState<number>(1)
  return (
    // <Styles.MainProgram>
    //   <Styles.SelectionBuildings>
    //     <button onClick={() => {setNumOfBuildings(numOfBuildings > 1 ? numOfBuildings-1 : numOfBuildings)}}>-</button>
    //     <input type="text" value={numOfBuildings} readOnly />
    //     <button onClick={() => {setNumOfBuildings(numOfBuildings +1)}}>+</button>
    //   </Styles.SelectionBuildings>
    //   <Styles.BuildingsRow>
    //     <Buildings numOfBuildings={numOfBuildings} />
    //   </Styles.BuildingsRow>
    // </Styles.MainProgram>
    <>
      <button onClick={() => {setNumOfBuildings(numOfBuildings > 1 ? numOfBuildings-1 : numOfBuildings)}}>-</button>
      <input type="text" value={numOfBuildings} readOnly />
      <button onClick={() => {setNumOfBuildings(numOfBuildings +1)}}>+</button>
      <Buildings numOfBuildings={numOfBuildings} />
    </>
  );
}

export default ElevatorChallenge;
