import { Component} from '@angular/core';
import {Router} from '@angular/router';
import { TennisDataService } from './core/service/tennis-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: TennisDataService, private router: Router)
  {
    this.dataService.loadData();
  }
}
