import { Officer } from "officers/Officer";

export class Government implements IGovernment {

    private officers: Officer[];

    constructor() {
        this.officers = [];
    }

    refresh() {

    }

    init() {
        //todo Initialize officers.
        for(const officer of this.officers) {
            officer.init();
        }
    }

    run() {
        //todo Run officers.
        for(const officer of this.officers) {
            officer.run();
        }
    }

    registerOfficer(officer: Officer): void {
        this.officers.push(officer);
    }
}