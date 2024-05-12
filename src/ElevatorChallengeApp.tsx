import React, { useState } from 'react';
import Buildings from './objects/buildings.tsx';

function ElevatorChallenge() {
  const [numOfBuildings, setNumOfBuildings] = useState<number>(1)
  return (
    <>
      <Buildings />
    </>
  );
}

export default ElevatorChallenge;
