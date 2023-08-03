import { gql } from 'graphql-tag';

const addRaceMutation = gql`
  mutation addRace(
    $command: AddRaceInput!
  ) {
    addRace(
      command: $command) {
      no
      startTime
      venue
    }
  }
`;

const addHorseMutation = gql`
  mutation addHorse(
    $command: AddHorseInput!
  ) {
    addHorse(
      command: $command) {
      name
      rank
    }
  }
`;

const enrollHorseMutation = gql`
  mutation enrollHorse(
    $command: EnrollHorseInput!
  ) {
    enrollHorse(
      command: $command) {
      race
      horse
    }
  }
`;

export {
  addRaceMutation,
  addHorseMutation,
  enrollHorseMutation
}