declare const enum _MEM {
    COLONY = 'C',
    OFFICER = 'O'
}

interface CreepMemory {
    [_MEM.COLONY]: string | null;
    [_MEM.OFFICER]: string | null;

    role: string;
}
