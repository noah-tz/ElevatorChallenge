

interface Settings {
    numOfFloors: number;
    numOfElevators: number;
    numOfBuildings: number;
    floorsPerSecond: number;
    minHeightBuilding: string;
    floorHeight: number;
};

const settings: Settings = {
    numOfFloors: 8,
    numOfElevators: 3,
    numOfBuildings: 2,
    floorsPerSecond: 2, 
    minHeightBuilding: '96vh',
    floorHeight: 117
};

export default settings;