import React from 'react';
import FloorFactory from './floor.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


class Buildings extends React.Component {
    elevatorSystems: Record<number, Elevators> = {};
    
    renderBuilding(buildingNumber: number): React.ReactNode {
        this.elevatorSystems[buildingNumber] = new Elevators({buildingNumber: buildingNumber});
        const floors = FloorFactory.createFloors(buildingNumber, this.elevatorSystems[buildingNumber])
        // const floors = FloorFactory.createFloors(buildingNumber, this.elevatorSystems[buildingNumber].orderFasterElevator)
        return(
            <Styles.Building>
                {floors}
                {this.elevatorSystems[buildingNumber].render()}
            </Styles.Building>
        )
    }

    orderElevator(floorNumber: number, buildingNumber: number): number{
        return this.elevatorSystems[buildingNumber].orderFasterElevator(floorNumber);
    }

    render(): React.ReactNode {
        return (
            <Styles.Buildings>
                {Array(settings.numOfBuildings).fill(null).map((_, idx) => (
                    this.renderBuilding(idx +1)
                ))}
            </Styles.Buildings>
        )
    }
}

export default Buildings;
