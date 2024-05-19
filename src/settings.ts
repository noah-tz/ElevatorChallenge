

interface Settings {
    buildings: [number, number][];
    floorsPerSecond: number;
    minHeightBuilding: string;
    floorHeight: number;
};
const settings: Settings = {
    buildings: [[8, 3], [8, 3]], // [[numberOfFloors, numberOfElevators] ...]
    floorsPerSecond: 2,
    minHeightBuilding: '96vh',
    floorHeight: 117
};

export default settings;