import React from 'react';
import Floor from './floor.tsx';
import Elevators from './elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


class Buildings extends React.Component {
    elevatorSystems: Record<number, Elevators> = {};
    
    private renderFloors(buildingNumber: number): React.ReactNode {
        return(
            <Styles.Floors>
                {Array(settings.numOfFloors).fill(null).map((_, idx) => (
                    <Floor
                        buildingNumber={buildingNumber}    
                        floorNumber={idx +1}
                        orderElevator={() => this.orderElevator(idx +1, buildingNumber)}
                    />
                ))}
            </Styles.Floors>
        )
    }
    
    renderBuilding(buildingNumber: number): React.ReactNode {
        this.elevatorSystems[buildingNumber] = new Elevators({buildingNumber: buildingNumber});
        return(
            <Styles.Building>
                {this.renderFloors(buildingNumber)}
                {this.elevatorSystems[buildingNumber].render()}
            </Styles.Building>
        )
    }

    orderElevator(floorNumber: number, buildingNumber): number{
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
