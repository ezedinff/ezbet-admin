import gql from 'graphql-tag';

export const APP = gql`
    {
      app{
        _id
        appName
        appLogo
        currentTime
        maxWin
        maxStake
        minStake
        withdrawalLimit
        bookmaker
        advertisements{
          id
          name
          position
          imagePath
        }
        rules
      }
    }
`;
