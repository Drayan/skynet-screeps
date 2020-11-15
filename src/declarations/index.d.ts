declare var global: any;

interface ICache {
    officers: { [officer: string]: { [roleName: string]: string[] } };
}

interface IGovernment {
    registerOfficer(officer: any): void;
}

interface IEmpire {
    cache: ICache;
    citizens: { [creepName: string]: any }
    government: IGovernment;
    mustRebuild: boolean;
    officers: { [officerName: string]: any }

    build(): void;
    refresh(): void;

    init(): void;
    run(): void;
}

declare namespace NodeJS {
    interface Global {
        Empire: IEmpire;
    }
}

declare var Empire: IEmpire;
