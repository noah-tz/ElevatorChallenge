

interface Settings {
    buildings: [number, number][];
    floorsPerSecond: number;
    minHeightBuilding: string;
    floorHeight: number;
};

const settings: Settings = {
    buildings: [[7, 3], [12, 2]],
    floorsPerSecond: 2,
    minHeightBuilding: '96vh',
    floorHeight: 117
};

export default settings;