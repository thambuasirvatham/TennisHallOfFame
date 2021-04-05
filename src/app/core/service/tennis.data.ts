import { ProTennisPlayer, AtpTennisCache } from '../model';

export const HallofFameTennisPlayers : ProTennisPlayer[] =
[
    {
        id:1,
        name:'Pete Sampras',
        rankingAndYears:1,
        ranking: 10,
        /*[
          {
            year: 1993,
            ranking: 10
          },
          {
            year: 1993,
            ranking: 10
          },
          {
            year: 1993,
            ranking: 20
          },
          {
            year: 1994,
            ranking: 12
          },
          {
            year: 1995,
            ranking: 4
          },
          {
            year: 1996,
            ranking: 1
          },
          {
            year: 1997,
            ranking: 1
          },
          {
            year: 1998,
            ranking: 2
          },
          {
            year: 1999,
            ranking: 10
          }
        ],*/
        country:'United States',
        residence: 'Washington DC, USA',
        prizeMoney:12324323,
        titles:85,
        backhandPlayingStyle:'Single Handed',
        funFact:`Andre Agassi once said: "I payed against him late 80's and he was all over the place. But, in 1990 he was completely different. From that point on he totally spoilled my career"`
    },
    {
        id:2,
        name:'Roger Federer',
        rankingAndYears:1,
        country:'',
        residence: 'St. Marys, SWIZ',
        ranking: 10,
        titles:105,
        prizeMoney:643223332,
        backhandPlayingStyle:'Single Handed',
        funFact:`Federer predicted that Novak Djokovic will be the next no.1`
    }
];

/*export const Titles : TournamentsWon[] =
[
    {
        id:1,
        tournaments:['Wimbledon','Australian Open', 'US Open']
    },
    {
        id:2,
        tournaments:['wimbledon', 'Australian Open', 'US Open', 'French Open']
    },
];*/


export function getNewCache(): AtpTennisCache {
      
      const cloneCollection = <T extends { id: number }>(collection: T[]) =>
        collection.map(item => {
          return { ...item };
        });
    
      return {
        players: cloneCollection(HallofFameTennisPlayers)
        //titles: cloneCollection(Titles),
      };
    }
