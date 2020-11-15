import { Citizen } from "Citizens/Citizen";
import { Colony } from "Colony";
import { random } from "lodash";

export abstract class Officer {
    colony: Colony;
    name: string;
    ref: string;

    private _creeps: { [roleName: string]: Creep[] };
    private _citizens: { [roleName: string]: Citizen[] };

    constructor(colony: Colony, name: string) {
        this.colony = colony;
        this.name = name;
        this.ref = colony.ref + '>' + this.name;
        this._creeps = {};
        this._citizens = {};

        //todo Find citizens assigned to this officer.
        this.refreshCitizens();

        // Register to the government.
        Empire.officers[this.ref] = this;
        Empire.government.registerOfficer(this);
    }

    refresh() {
        //todo Refresh citizens.
        this.refreshCitizens();
    }

    refreshCitizens() {
        this._creeps = _.mapValues(Empire.cache.officers[this.ref],
            creepsOfRole => _.map(creepsOfRole, creepName => Game.creeps[creepName]));

        for(const role in this._citizens) {
            this.syncCitizens(role);
        }
    }

    abstract init(): void;
    abstract run(): void;

    protected findCitizens(role: string): Citizen[] {
        if(!this._citizens[role]) {
            this._citizens[role] = [];
            this.syncCitizens(role);
        }

        return this._citizens[role];
    }

    protected requestCitizen(setup: BodyPartConstant[], role: string) {
        //todo Replace hardcode spawn logic with spawngroup searching, etc.
        const code = Game.spawns['Spawn1'].spawnCreep(setup, role + '_' + _.random(0, 100, false), { memory: {
            [_MEM.OFFICER]: this.ref,
            [_MEM.COLONY]: this.colony.name,
            role: role
        }});

        if(code != OK) {
            switch(code) {
                case ERR_INVALID_ARGS:
                    console.log("Can't spawn creep : invalid args.");
                    break;
            }
        }
    }

    protected executeTasks() {}

    private syncCitizens(role: string): void {
        const citizensNames = _.zipObject(_.map(this._citizens[role] || [],
            citizen => [citizen.name, true])) as { [name: string]: boolean };
        const creepsNames = _.zipObject(_.map(this._creeps[role] || [],
            creep => [creep.name, true])) as { [name: string]: boolean };

        // Add new creeps that aren't registered in the citizenship registry.
        for(const creep of this._creeps[role] || []) {
            if(!citizensNames[creep.name]) {
                this._citizens[role].push(Empire.citizens[creep.name] || new Citizen(creep));
            }
        }

        // Remove dead/reassigned creeps from the citizenship registry.
        for(const citizen of this._citizens[role]) {
            if(!creepsNames[citizen.name]) {
                _.remove(this._citizens[role], c => c.name == citizen.name);
            }
        }
    }
}