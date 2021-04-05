
export interface FamousTennisPlayer
{
    id: number;
    name: string;
    ranking:number;
    country:string;
    residence:string;
    prizeMoney:number;
    backhandPlayingStyle:string;
}

export interface TournamentsWon{
    id:number;
    tournaments:string[];
}