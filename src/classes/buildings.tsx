import React from 'react';
import FloorFactory from './floor.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


class Buildings extends React.Component {
    elevatorSystems: Record<number, Elevators> = {};
    
    renderBuilding(numberOfFloors: number, buildingNumber: number): React.ReactNode {
        this.elevatorSystems[buildingNumber] = new Elevators({buildingNumber: buildingNumber});
        const floors: React.ReactNode = FloorFactory.createFloors(
            buildingNumber,
            numberOfFloors,
            this.elevatorSystems[buildingNumber]
        )
        return(
            numberOfFloors > 0 &&
            <Styles.Building>
                {floors}
                {this.elevatorSystems[buildingNumber].render()}
            </Styles.Building>
        )
    }

    render(): React.ReactNode {
        return (
            <Styles.Buildings>
                {settings.buildings.map((numberOfFloors, idx) => (
                    this.renderBuilding(numberOfFloors, idx +1)
                ))}
            </Styles.Buildings>
        )
    }
}

export default Buildings;
