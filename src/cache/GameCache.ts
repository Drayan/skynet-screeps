import { Z_MEM_ERROR } from "zlib";

export class GameCache {

    officers: { [officer: string]: { [roleName: string]: string[] } };

    constructor() {
        this.officers = {};
    }

    build() {
        this.cacheOfficers();
    }

    refresh() {
        this.cacheOfficers();
    }

    private cacheOfficers() {
        this.officers = {};

        const creepNamesByOfficer = _.groupBy(_.keys(Game.creeps), name => Game.creeps[name].memory[_MEM.OFFICER]);
        for(const ref in creepNamesByOfficer) {
            this.officers[ref] = _.groupBy(creepNamesByOfficer[ref], name => Game.creeps[name].memory.role);
        }
    }
}