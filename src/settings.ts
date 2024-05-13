

interface Settings {
    numOfFloors: number;
    numOfElevators: number;
    numOfBuildings: number;
    floorsPerSecond: number;
    minHeightBuilding: string;
};

const settings: Settings = {
    numOfFloors: 100,
    numOfElevators: 1,
    numOfBuildings: 1,
    floorsPerSecond: 2, 
    minHeightBuilding: '96vh'
};

export default settings;