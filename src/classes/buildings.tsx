import React from 'react';
import FloorFactory from './floor.tsx';
import ElevatorsSystem from './elevators/elevators.tsx';
import * as Styles from '../stylesFiles/buildings.styles.ts'
import settings from '../settings.ts';


// Class 'Building' representing each building in buildings
interface propsBuilding {
    numberOfFloors: number;
    numberOfElevators: number;
    buildingNumber: number;
}
class Building extends React.Component<propsBuilding> {
    private elevatorSystem: ElevatorsSystem = new ElevatorsSystem({
        buildingNumber: this.props.buildingNumber,
        numberOfElevators: this.props.numberOfElevators
    })
    private floors: React.ReactNode = FloorFactory.createFloors(
        this.props.buildingNumber,
        this.props.numberOfFloors,
        this.elevatorSystem
    )

    render(): React.ReactNode {
        return(
            this.props.numberOfFloors > 0 &&
            this.props.numberOfElevators > 0 &&
            <Styles.Building>
                {this.floors}
                {this.elevatorSystem.render()}
            </Styles.Building>
        )
    }
}



// Produces multiple buildings upon 'settings' file parameters.
// The use is through the function 'createBuildings' (static function)
class BuildingFactory {
    private static createBuildingComponent(
        numberOfFloors: number,
        numberOfElevators: number,
        buildingNumber: number,
    ): React.ReactNode {
        return(
            <Building
                numberOfFloors={numberOfFloors}
                numberOfElevators={numberOfElevators}
                buildingNumber={buildingNumber}
            />
        );
    }

    // Produces multiple buildings upon 'settings' file parameters.
    static createBuildings(): React.ReactNode {
        return (
            <Styles.Buildings>
                {settings.buildings.map(([numberOfFloors, numberOfElevators], idx) => (
                    this.createBuildingComponent(numberOfFloors, numberOfElevators, idx +1)
                ))}
            </Styles.Buildings>
        );
    }
}


// Class 'Buildings' representing all the buildings
class Buildings extends React.Component {
    render(): React.ReactNode {
        return (
            <Styles.Buildings>
                {BuildingFactory.createBuildings()}
            </Styles.Buildings>
        )
    }
}

export default Buildings;
