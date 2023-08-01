import MATCHES from "./data/matches";
import TEAMS from "./data/teams";
import PLAYERS from "./data/players";
import { FootballMatch, Player, Team } from "./entities";

export const resolvers = {
    Query: {
        matches: () => MATCHES,
        teams: () => TEAMS,
        players: () => PLAYERS,
    },
    FootballMatch: {
        __resolveReference(match: FootballMatch) {
            return MATCHES.find(m => m.id === match.id);
        },
    },
    Team: {
        __resolveReference(team: Team) {
            return TEAMS.find(t => t.id === team.id);
        },
    },
    Player: {
        __resolveReference(player: Player) {
            return PLAYERS.find(p => p.id === player.id);
        },
    },
};
