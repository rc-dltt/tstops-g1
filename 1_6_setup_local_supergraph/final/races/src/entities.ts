export class Race {
    id!: string;
    no: number | undefined;
    startTime!: string;
    venue!: string;
    horses!: Horse[];

    constructor(source: Partial<Race>) {
        Object.assign(this, source);
    }
}

export class Horse {
    id!: string;
    name!: string;
    rank: number | undefined;

    constructor(source: Partial<Horse>) {
        Object.assign(this, source);
    }
}
