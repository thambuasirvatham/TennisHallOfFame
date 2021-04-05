import {Subject, Observable} from 'rxjs';
import {ProTennisPlayer} from './AtpPros';
import { first } from 'rxjs/operators';

type EntityGuardFn = (entity: {}, isAdd?: boolean, cache?: AtpTennisCache) => {};

export const modelGuards: { [key: string]: EntityGuardFn } = {
  players: playerGuard,
};

function playerGuard(player: Partial<ProTennisPlayer>): Partial<ProTennisPlayer> {
  // Savable only
  const { id, name, residence, titles, prizeMoney, backhandPlayingStyle, funFact } = player;
  return { id, name, residence, titles, prizeMoney, backhandPlayingStyle, funFact };
}

export type TennisDataType =  ProTennisPlayer;
export interface AtpTennisCache
{
    [key:string]: TennisDataType[];
    //trophies: TournamentsWon[];
    players: ProTennisPlayer[];
}

export type TennisPlayersCacheStore = Subject<AtpTennisCache>;


export function updateEntity<T extends TennisDataType>(
  entity: T,
  collectionName: keyof AtpTennisCache,
  cacheStore: TennisPlayersCacheStore
): T {
  const id = entity.id;
  const update = updateEntityGuard(entity, collectionName, cacheStore);
  cacheStore.pipe(first()).subscribe(cache => {
    const coll = (cache[collectionName] as any) as T[];

    // Update-one-in-cache reducer
    cache = {
      ...cache,
      [collectionName]: coll.map(e => (e.id === id ? (entity = { ...e, ...update }) : e))
    };

    cacheStore.next(cache);
  });
  return entity;
}
function updateEntityGuard<T extends { id: number }>(
  entity: T,
  collectionName: keyof AtpTennisCache,
  cache$: Observable<AtpTennisCache>
): T {
  const id = entity.id;
  if (id == null) {
    throw new Error(`Error`);
  }
  let p:any;
  const cache = currentValueOfCache(cache$);
  return modelGuards[collectionName](entity, false, cache) as T;
}
export function currentValueOfCache(cache$: Observable<AtpTennisCache>) {
    let cache: AtpTennisCache;
    cache$.pipe(first()).subscribe(c => (cache = c));
    return cache;
}

export function currentValueOfCollection<T extends TennisDataType>(
    collectionName: keyof AtpTennisCache,
    cache$: Observable<AtpTennisCache>
  ) {
    return currentValueOfCache(cache$)[collectionName] as T[];
  }

  