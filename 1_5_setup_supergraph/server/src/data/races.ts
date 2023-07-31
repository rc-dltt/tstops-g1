import { HORSES } from "./horses";

export const RACES = [
    {
        id: "race#1",
        no: 1001,
        startTime: "2023-08-31T19:00:00",
        venue: "Sha Tin Racecourse",
        horses: HORSES.slice(0,3),
    },
    {
        id: "race#2",
        no: 1002,
        startTime: "2023-08-31T19:15:00",
        venue: "Happy Valley Racecourse",
        horses: HORSES.slice(3),
    },
];
