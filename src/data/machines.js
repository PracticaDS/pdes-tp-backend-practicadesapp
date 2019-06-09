const getNewMachines = (factoryId, src) =>
  Array.from({ length: 100 }).map((_, position) => ({
    className: 'dpiece',
    src,
    alt: '1',
    position,
    rawMaterials: [],
    typeMachine: -1,
    rawMaterialStarter: -1,
    direction: 'd',
    value: -1,
    crafterMaterials: [],
    crafterReturn: -1,
    factoryId
  }));

module.exports = getNewMachines;
