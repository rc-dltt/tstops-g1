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

export {
    allRaceQuery,
    allHorseQuery
  };