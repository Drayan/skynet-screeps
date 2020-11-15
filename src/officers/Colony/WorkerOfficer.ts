import { Citizen } from "Citizens/Citizen";
import { Roles } from "Citizens/Roles";
import { Colony } from "Colony";
import { Officer } from "officers/Officer";

export class WorkerOfficer extends Officer {

    workers: Citizen[];

    constructor(colony: Colony) {
        super(colony, 'worker');

        //todo Find important structures.
        //todo Get workers.
        this.workers = this.findCitizens(Roles.WORKER);
        console.log("Officer Worker created.");
    }

    init() {
        //todo Calculate and spawn any necessary citizens.
        const MAX_WORKERS = 10;
        if(this.workers.length < MAX_WORKERS) {
            this.requestCitizen([WORK, WORK, CARRY, MOVE], Roles.WORKER);
        }
    }

    run() {
        // Run citizens logics.
        for(const worker of this.workers) {
            this.handleWorker(worker);
        }
    }

    private handleWorker(worker: Citizen): void {
        this.upgradeAction(worker);
    }

    private upgradeAction(worker: Citizen): void {
        if(worker.creep.store[RESOURCE_ENERGY] < worker.creep.store.getCapacity()) {
            const target = worker.creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(target) {
                if(worker.creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    worker.creep.moveTo(target, { visualizePathStyle: {} });
                }
            }
        } else {
            const target = worker.creep.room.controller;
            if(target) {
                if(worker.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                    worker.creep.moveTo(target, { visualizePathStyle: {} });
                }
            }
        }
    }
}