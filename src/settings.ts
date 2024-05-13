

interface Settings {
    numOfFloors: number;
    numOfElevators: number;
    numOfBuildings: number;
    floorsPerSecond: number;
    minHeightBuilding: string;
};

const settings: Settings = {
    numOfFloors: 8,
    numOfElevators: 3,
    numOfBuildings: 2,
    floorsPerSecond: 2, 
    minHeightBuilding: '96vh'
};

export default settings;