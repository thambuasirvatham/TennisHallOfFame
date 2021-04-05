import { ChangeDetectorRef, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TennisDataService } from '../core/service/tennis-data.service';
import {FamousTennisPlayer} from '../core/shared';
import { ProTennisPlayer } from 'app/core/model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, DoCheck, OnChanges {
  players:ProTennisPlayer[];
  playerUpdateObj:ProTennisPlayer;
  constructor(private dataService: TennisDataService, private ref: ChangeDetectorRef) { 
    dataService.players$.subscribe(
      playrs => {this.players = playrs;}
    );
  }

 get player()
 {
  // this.players.forEach(pl => {
  //     if(pl.id == this.dataService.getId())
  //       return Object.assign({}, pl);
  // });
  // return this.dataService.getId();

  for(let playr of this.players)
  { 
     if(playr.id == this.dataService.getId())
     {
       if(!this.playerUpdateObj || playr.id != this.playerUpdateObj.id)
        this.playerUpdateObj = Object.assign({}, playr);
       return playr;
     }
  }
}
ngDoCheck(){
  for(let playr of this.players)
  { 
     if(playr.id == this.dataService.getId())
     {
       if(!this.playerUpdateObj || playr.id != this.playerUpdateObj.id)
       {
        this.playerUpdateObj = Object.assign({}, playr);
        this.ref.detectChanges();
       }
     }
  }
}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void
  {
     //alert(1);
  }

  saveUser(pl: FamousTennisPlayer)
  {
    this.dataService.updatePlayer(pl);
  }
}
