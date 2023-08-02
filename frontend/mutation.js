import { gql } from 'graphql-tag';

const addRaceMutation = gql`
  mutation RaceByNo($no: Int!) {
    races(no: $no) {
      id
      no
      startTime
      venue
      horses {
        id
        name
        rank
      }
    }
  }
`;

const addHorseMutation = gql`
  mutation RaceByNo($no: Int!) {
    races(no: $no) {
      id
      no
      startTime
      venue
      horses {
        id
        name
        rank
      }
    }
  }
`;

const enrollHorseMutation = gql`
  mutation enrollHorse(command: $horse: Int!) {
    races(no: $no) {
      id
      no
      startTime
      venue
      horses {
        id
        name
        rank
      }
    }
  }
`;

export {
  addRaceMutation,
  addHorseMutation,
  enrollHorseMutation
}