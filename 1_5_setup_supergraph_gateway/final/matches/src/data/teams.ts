import { Team } from '../entities';
import PLAYERS from './players';

const TEAMS: Team[] = [
    new Team({
        id: "team#1",
        name: "Manchester City",
        country: "England",
        players: PLAYERS.slice(0,10),
    }),
    new Team({
        id: "team#2",
        name: "Bayern München",
        country: "Germany",
        players: PLAYERS.slice(10,10),
    }),
    new Team({
        id: "team#3",
        name: "Real Madrid",
        country: "Spain",
        players: PLAYERS.slice(20),
    }),
];

export default TEAMS;
