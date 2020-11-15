import { WorkerOfficer } from "officers/Colony/WorkerOfficer";

export class Colony {

    name: string;
    ref: string;
    officers: { work: WorkerOfficer; } | undefined

    constructor(name: string) {
        this.name = name;
        this.ref = name;
    }

    refresh() {}

    init() {}

    run() {}

    registerOfficers() {
        console.log("Registering colony officers.");
        this.officers = { work: new WorkerOfficer(this) };
    }
}