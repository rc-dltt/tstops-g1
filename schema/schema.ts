type Query {
    
    "Get list of today's races"
    todaysRaces: [Race]!

    "Get list of horses for a speciofic race"
    raceHorses: [Horse]!
}

type Mutation {

}

type Race {
    id: ID!
    date: Date!
    horses: [Horse]!
}

type Horse {
    id: ID!
    name: String!
}

type Bet {
    id: ID!
    owner: String!
    date: Date!
    race: Race!
    horse: Horse!
    amount:     
}