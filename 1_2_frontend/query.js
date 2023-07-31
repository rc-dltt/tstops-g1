import { gql } from 'apollo-boost';

const getRaceByNo = gql`
  query RaceByNo($no: Int!) {
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
    getRaceByNo
}