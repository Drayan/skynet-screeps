export class Citizen {
    creep: Creep;       // The creep that is wrapped
    memory: CreepMemory;
    name: string;

    constructor(creep: Creep) {
        this.creep = creep;
        this.memory = creep.memory;
        this.name = creep.name;
    }
}