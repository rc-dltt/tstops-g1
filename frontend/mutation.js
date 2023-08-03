import { gql } from 'graphql-tag';

// const loginMutation = gql`
// mutation login(
//   $email: String!,
//   $password: String!
//   ) {
//   login(
//     email: $username,
//     password: $password
//     )
// }
// `;

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
  // loginMutation,
  addRaceMutation,
  addHorseMutation,
  enrollHorseMutation
}