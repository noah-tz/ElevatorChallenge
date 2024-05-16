

interface Settings {
    buildings: number[];
    numOfElevators: number;
    floorsPerSecond: number;
    minHeightBuilding: string;
    floorHeight: number;
};

const settings: Settings = {
    buildings: [3, 10, 0, 4],
    numOfElevators: 3,
    floorsPerSecond: 2,
    minHeightBuilding: '96vh',
    floorHeight: 117
};

export default settings;