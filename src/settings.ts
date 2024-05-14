

interface Settings {
    numOfFloors: number;
    numOfElevators: number;
    numOfBuildings: number;
    floorsPerSecond: number;
    minHeightBuilding: string;
    floorHeight: number;
};

const settings: Settings = {
    numOfFloors: 9,
    numOfElevators: 4,
    numOfBuildings: 1,
    floorsPerSecond: 2, 
    minHeightBuilding: '96vh',
    floorHeight: 116 + (1/3)*2
};

export default settings;