import { GameCache } from "cache/GameCache";
import { Citizen } from "Citizens/Citizen";
import { Colony } from "Colony";
import { Government } from "Government";
import { Officer } from "officers/Officer";

export class _Empire implements IEmpire {
    mustRebuild: boolean;
    government: Government;
    colonies: { [roomName: string]: Colony };
    citizens: { [creepName: string]: Citizen };
    officers: { [officerName: string]: Officer };
    cache: GameCache;

    constructor() {
        this.government = new Government();
        this.colonies = {};
        this.citizens = {};
        this.officers = {};
        this.cache = new GameCache();
        this.mustRebuild = true;
    }

    build() {
        // Build cached data.
        this.cache.build();

        // Find and register all colonies.
        this.findAndRegisterColonies();

        // todo Find and register all directives.

        // Register all officers.
        this.registerOfficers();

        this.mustRebuild = false;
    }

    refresh() {
        // Refresh cached data.
        this.cache.refresh();

        // Refresh government.
        this.government.refresh();

        // Refresh colonies.
        this.refreshColonies();

        //todo Refresh directives.

        // Refresh officers.
        for(const officerName in this.officers) {
            this.officers[officerName].refresh();
        }
    }

    init() {
        // Init government.
        this.government.init();

        // Init colonies.
        for(const colonyName in this.colonies) {
            this.colonies[colonyName].init();
        }
    }

    run() {
        // Run government.
        this.government.run();

        // Run colonies.
        for(const colonyName in this.colonies) {
            this.colonies[colonyName].run();
        }
    }

    /// Search for colonies in the empire and register them in the global registry.
    private findAndRegisterColonies() {
        for(const roomName in Game.rooms) {
            if(Game.rooms[roomName].my) {
                this.colonies[roomName] = new Colony(roomName);
            }
        }
    }

    /// Register all colonies and directives officers.
    private registerOfficers() {
        for(const colonyName in this.colonies) {
            console.log(`Trying to register officers for colony ${colonyName}.`);
            this.colonies[colonyName].registerOfficers();
        }
    }

    /// Refresh all colonies.
    private refreshColonies() {
        for(const colonyName in this.colonies) {
            this.colonies[colonyName].refresh();
        }
    }
}