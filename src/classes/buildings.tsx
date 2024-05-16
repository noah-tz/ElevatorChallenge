import React from 'react';
import FloorFactory from './floor.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


class Buildings extends React.Component {
    elevatorSystems: Record<number, Elevators> = {};
    
    renderBuilding(numberOfFloors: number, numberOfElevators: number, buildingNumber: number): React.ReactNode {
        this.elevatorSystems[buildingNumber] = new Elevators({buildingNumber: buildingNumber, numberOfElevators: numberOfElevators});
        const floors: React.ReactNode = FloorFactory.createFloors(
            buildingNumber,
            numberOfFloors,
            this.elevatorSystems[buildingNumber]
        )
        return(
            numberOfFloors > 0 &&
            numberOfElevators > 0 &&
            <Styles.Building>
                {floors}
                {this.elevatorSystems[buildingNumber].render()}
            </Styles.Building>
        )
    }

    render(): React.ReactNode {
        return (
            <Styles.Buildings>
                {settings.buildings.map(([numberOfFloors, numberOfElevators], idx) => (
                    this.renderBuilding(numberOfFloors, numberOfElevators, idx +1)
                ))}
            </Styles.Buildings>
        )
    }
}

export default Buildings;
