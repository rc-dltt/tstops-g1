import { FootballMatch } from "../entities";
import TEAMS from "./teams";

const MATCHES: FootballMatch[] = [
    new FootballMatch({
        id: "match#1",
        no: 1001,
        startTime: "2023-08-31T20:00:00",
        venue: "Etihad Stadium",
        country: "England",
        homeTeam: TEAMS.find(t => t.id === "team#1"),
        visitorsTeam: TEAMS.find(t => t.id === "team#2"),
    }),
    new FootballMatch({
        id: "match#2",
        no: 1002,
        startTime: "2023-08-24T20:00:00",
        venue: "Allianz Arena",
        country: "Germany",
        homeTeam: TEAMS.find(t => t.id === "team#2"),
        visitorsTeam: TEAMS.find(t => t.id === "team#3"),
    }),
    new FootballMatch({
        id: "match#3",
        no: 1001,
        startTime: "2023-08-17T20:00:00",
        venue: "Santiago Bernabeu Stadium",
        country: "Spain",
        homeTeam: TEAMS.find(t => t.id === "team#3"),
        visitorsTeam: TEAMS.find(t => t.id === "team#1"),
    })
];

export default MATCHES;
