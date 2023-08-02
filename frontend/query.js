import { gql } from 'graphql-tag';

const allRaceQuery = gql`
  query races {
    races{
      id
      no
      startTime
      venue
    }
  }
`;

const allHorseQuery = gql`
  query horses {
    horses {
        id
        name
        rank
      }
    }
`;

// const raceByNoQuery = gql`
//   query RaceByNo($no: Int!) {
//     races(no: $no) {
//       id
//       no
//       startTime
//       venue
//       horses {
//         id
//         name
//         rank
//       }
//     }
//   }
// `;

// const loginQuery = gql`
//   query loginQuery($no: Int!) {
//     races(no: $no) {
//       id
//       no
//       startTime
//       venue
//       horses {
//         id
//         name
//         rank
//       }
//     }
//   }
// `;

export {
  allRaceQuery,
  allHorseQuery,
  //raceByNoQuery,
  //loginQuery
}