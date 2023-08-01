export class FootballMatch {
    id!: string;
    no: number | undefined;
    startTime!: string;
    venue!: string;
    country!: string; 
    homeTeam!: Team;
    visitorsTeam!: Team;

    public constructor(source: Partial<FootballMatch>) {
        Object.assign(this, source);
    }
}

export class Team {
    id!: string;
    name!: string;
    country!: string;
    players!: Player[];

    public constructor(source: Partial<Team>) {
        Object.assign(this, source);
    }
}

export class Player {
    id!: string;
    name!: string;
    age: number | undefined;
    team: Team | undefined;

    public constructor(source: Partial<Player>) {
        Object.assign(this, source);
    }
}
