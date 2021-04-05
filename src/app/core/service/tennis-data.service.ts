import { Injectable } from '@angular/core';
import { ProTennisPlayer, updateEntity, AtpTennisCache, currentValueOfCollection } from '../model';
import { of, ReplaySubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {getNewCache} from './tennis.data';
import { concatMap, first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TennisDataService {

  id:number = 1;
  constructor() { }

  private cacheStore = new ReplaySubject<AtpTennisCache>(1);
  cache$ = this.cacheStore.asObservable();

  players$ = this.cache$.pipe(map(c => c.players));
  trophies$ = this.cache$.pipe(map(l => l.trophies));

  getPlayer(id:number) 
  {
    this.players$.subscribe(pl =>
      {return this.getClonedData(id, pl);}
    );
  }

  setId(id)
  {
    this.id = id;
  }

  getId()
  {
    return this.id;
  }
  getClonedData(id:number, player: ProTennisPlayer[]) : any
  {
    player.forEach(pl => {
      if(pl.id == id)
         return Object.assign({}, pl);
    });
  }  

  loadData() {
    this.cacheStore.next(getNewCache());
  }

  get players() {
    return currentValueOfCollection<ProTennisPlayer>('players', this.cache$);
  }

  // getTournamensWon() : Observable<TournamentsWon[]> {
  //   return of(this.Titles);
  // }

  /*addPlayer() : Observable<ProTennisPlayer[]>
  {
    let newid = this.HallofFameTennisPlayers[this.HallofFameTennisPlayers.length-1].id + 1;
    this.HallofFameTennisPlayers.push(
      {
        id: newid,
        name: 'Test',
        ranking: 0,
        country: '',
        earnings: 0
      }
    );
    this.playertsSubject$.next(this.HallofFameTennisPlayers);
    return of(this.HallofFameTennisPlayers);
  }*/

  updatePlayer(player: Partial<ProTennisPlayer>): ProTennisPlayer {
    return updateEntity<ProTennisPlayer>(player as ProTennisPlayer, 'players', this.cacheStore);
  }
}

